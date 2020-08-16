import { Component, OnDestroy, OnInit } from '@angular/core'
import { BALANCES_BY_TYPE_FOR_MANAGER } from '@shared/modules/merchant/merchant.module-conf'
import {
  AccountType,
  Merchant,
  MerchantActivationData,
  MerchantBalance,
  MerchantNotificationSettings,
  MerchantSettings,
  VerificationData,
  VerificationDocumentData,
  Wallet
} from '@shared/models'
import { FormControl, FormGroup } from '@angular/forms'
import { AdminMerchantsFacade } from '@shared/store/admin/merchants/admin-merchants.facade'
import { select, Store } from '@ngrx/store'
import { RootStoreState } from '@shared/store/root-store.interface'
import { ActivatedRoute, Params } from '@angular/router'
import { takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs'
import { AdminVerificationFacade } from '@shared/store/admin/verification/admin-verification.facade'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { DialogAddWalletComponent } from './dialog-add-wallet/dialog-add-wallet.component'
import { MatCheckboxChange } from '@angular/material/checkbox'
import {
  selectMerchant,
  selectMerchantBalances,
  selectMerchantNotifications,
  selectMerchantSettings,
  selectMerchantWallets
} from '@shared/store/admin/merchants/merchants.selectors'
import { selectAllMerchantVerifications } from '@shared/store/admin/verification/verification.selectors'

enum NotificationEnableState {
  unconfirmedSite = 'unverifiedSitePayment',
  amountExceeded = 'transactionAcceptedAmountNotification'
}

@Component({
  selector: 'merchants-details',
  templateUrl: './merchants-details.component.html',
  styleUrls: [ './merchants-details.component.scss' ],
  providers: [ AdminVerificationFacade ]
})
export class MerchantsDetailsComponent implements OnInit, OnDestroy {
  private _destroyed$ = new Subject()

  loading$ = this.facadeCoreAdmin.loading$
  idMer: string
  merchantData: Merchant
  merchantBalances: MerchantBalance[]
  merchantWallets: Wallet[]
  selectedCurrency: string
  selectedLanguage: string
  balanceType: { id: number, title: string }[] = BALANCES_BY_TYPE_FOR_MANAGER
  isMerchantBlocker = false

  currencies: string[] = [ 'USD', 'EUR', 'GBP', 'CHF', 'CAD', 'AUD', 'RUB' ]
  languages: string[] = [ 'ru', 'en' ]

  isUAHWallet: boolean

  currency: FormGroup
  language: FormGroup
  email: FormGroup

  unconfirmedSiteControl: FormControl
  amountExceededControl: FormControl

  notificationState = NotificationEnableState

  // Verification
  userVerificationData: VerificationData[]
  personalData: VerificationData[]
  businessData: VerificationData[]

  constructor(
    private facadeCoreAdmin: AdminMerchantsFacade,
    private store: Store<RootStoreState>,
    private route: ActivatedRoute,
    private verifyFacade: AdminVerificationFacade,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.subscribeForMerchantData()
    this.subscribeForMerchantBalances()
    this.subscribeForMerchantWallets()
    this.subscribeForMerchantSettings()

    this.subscribeForVerification()

    this.route.params.subscribe((params: Params) => {
      if (params) {
        this.idMer = params['id']
        this.facadeCoreAdmin.getChangeNotificationEnableState(this.idMer)
        this.facadeCoreAdmin.getMerchantById(this.idMer)
        this.facadeCoreAdmin.getMerchantSettings(this.idMer)
        this.verifyFacade.getVerificationsForAllMerchant({ userIdentifier: this.idMer })

        this.initForm()
      }
    })
  }

  ngOnDestroy() {
    this._destroyed$.next()
    this._destroyed$.complete()
  }

  subscribeForMerchantData() {
    this.store.pipe(
      select(selectMerchant),
      takeUntil(this._destroyed$)
    ).subscribe((merchant: Merchant) => {
      if (merchant) {
        this.merchantData = merchant
        this.isMerchantBlocker = !this.isMerchantBlocker
        this.isMerchantBlocker = this.merchantData.status === 2
      }
    })
  }

  subscribeForMerchantBalances() {
    this.store.pipe(
      select(selectMerchantBalances),
      takeUntil(this._destroyed$)
    ).subscribe((merchantBalances: MerchantBalance[]) => {
      if (merchantBalances) {
        this.merchantBalances = merchantBalances
      }
    })
  }

  subscribeForMerchantWallets() {
    this.store.pipe(
      select(selectMerchantWallets),
      takeUntil(this._destroyed$)
    ).subscribe((merchantWallets: Wallet[]) => {
      if (merchantWallets) {
        this.merchantWallets = merchantWallets
        this.checkUAHWallet()
      }
    })
  }

  subscribeForMerchantSettings() {
    this.store.pipe(
      select(selectMerchantSettings),
      takeUntil(this._destroyed$)
    ).subscribe((data: MerchantSettings) => {
      if (data) {
        this.selectedCurrency = data.currency
        this.selectedLanguage = data.language
        this.facadeCoreAdmin.getMerchantBalances(this.idMer, this.selectedCurrency)
        this.facadeCoreAdmin.getMerchantWallets(this.idMer, this.selectedCurrency)
        this.facadeCoreAdmin.getMerchantById(this.idMer)
      }
    })

    this.store.pipe(
      select(selectMerchantNotifications),
      takeUntil(this._destroyed$)
    ).subscribe((notifications: MerchantNotificationSettings) => {
      if (notifications) {
        this.setNotificationFormControls(notifications)
      }
    })
  }

  // Verification
  subscribeForVerification() {
    this.store.pipe(
      select(selectAllMerchantVerifications),
      takeUntil(this._destroyed$)
    ).subscribe((verificationData: VerificationData[]) => {
      if (verificationData) {
        this.userVerificationData = this.getUserVerificationData(verificationData).sort((a, b): any => +b.identifier - +a.identifier)
        this.personalData = this.userVerificationData.filter((data: VerificationData) => data.accountType === AccountType.personal)
        this.businessData = this.userVerificationData.filter((data: VerificationData) => data.accountType === AccountType.company)
      }
    })
  }

  acceptVerification(identifier: string) {
    const query = { userIdentifier: this.idMer }
    this.verifyFacade.acceptVerification(identifier, query)
  }

  rejectVerification(identifier: string) {
    const query = { userIdentifier: this.idMer }
    this.verifyFacade.rejectVerification(identifier, query)
  }

  editVerification(verifyData: { identifier: string, data: any }) {
    const query = { userIdentifier: this.idMer }
    this.verifyFacade.editVerification(verifyData, query)
  }

  addVerificationDocument(documentData: VerificationDocumentData) {
    const query = { userIdentifier: this.idMer }
    this.verifyFacade.addDocument(documentData, query)
  }

  getUserVerificationData(verificationData: VerificationData[]): VerificationData[] {
    return verificationData.filter((data: VerificationData) => {
      return data.userIdentifier === this.idMer
    })
  }

  getBalanceByAccountType(accountType: number): MerchantBalance {
    return this.merchantBalances.find(balance => balance.accountType === accountType)
  }

  trackByFn(index, item) {
    return item.id
  }

  initForm() {
    this.currency = new FormGroup({
      curr: new FormControl('')
    })

    this.language = new FormGroup({
      lang: new FormControl('')
    })

    this.email = new FormGroup({
      email: new FormControl('')
    })

    this.unconfirmedSiteControl = new FormControl(false)
    this.amountExceededControl = new FormControl(false)
  }

  setNotificationFormControls(notifications: MerchantNotificationSettings) {
    const notificationEnabled = notifications.notificationEnabled
    this.unconfirmedSiteControl = new FormControl(notificationEnabled[this.notificationState.unconfirmedSite])
    this.amountExceededControl = new FormControl(notificationEnabled[this.notificationState.amountExceeded])
  }

  onChangeNotify(event: MatCheckboxChange, state: NotificationEnableState) {
    this.changeNotification(state, event.checked)
  }

  changeNotification(state: NotificationEnableState, value: boolean) {
    const data = {
      name: '',
      enabled: value
    }

    switch (state) {
      case NotificationEnableState.amountExceeded:
        data.name = NotificationEnableState.amountExceeded
        break
      case NotificationEnableState.unconfirmedSite:
        data.name = NotificationEnableState.unconfirmedSite
        break
    }

    this.facadeCoreAdmin.postChangeNotificationEnableState(this.idMer, data)
  }

  setMainCurrency(currency: string) {
    this.facadeCoreAdmin.postSetMainCurrency(
      {
        identifier: this.merchantData.id.toString(),
        currency: currency
      }
    )
  }

  saveCurrency(value) {
    this.facadeCoreAdmin.postSaveMerchantCurrency(
      {
        identifier: this.merchantData.id.toString(),
        currency: value.curr
      }
    )
  }

  saveLanguage(value) {
    this.facadeCoreAdmin.postSaveMerchantLanguage(
      {
        identifier: this.merchantData.id.toString(),
        language: value.lang
      }
    )
  }

  saveEmail(value) {
    if (value.email !== '') {
      this.facadeCoreAdmin.postSaveMerchantEmail({
        email: value.email,
        identifier: this.merchantData.id.toString()
      })
    }
  }

  resetPassword() {
    this.facadeCoreAdmin.postResetPassword(
      {
        email: this.merchantData.personalInformation.email,
        identifier: this.idMer
      }
    )
  }

  blockMerchant(merchantIdentifier: string) {
    this.isMerchantBlocker = this.merchantData.status === 2
    this.facadeCoreAdmin.postBlockMerchant(merchantIdentifier)
  }

  activateMerchant() {
    const activateData: MerchantActivationData = {
      email: encodeURIComponent(this.merchantData.personalInformation.email),
      accessToken: this.merchantData.systemInformation.accessToken,
      identifier: this.idMer
    }

    this.isMerchantBlocker = this.merchantData.status === 2
    this.facadeCoreAdmin.postActivateMerchant(activateData)
  }

  checkUAHWallet() {
    this.isUAHWallet = this.merchantWallets.filter((wallet: Wallet) => wallet.money.code === 'UAH').length !== 0
  }

  // TODO: refactor it later! )
  addWallet() {
    const dialog = this.openDialog()

    dialog.afterClosed().subscribe((data: { [key: string]: boolean }) => {
      if (data) {
        this.createWallet(data)
      }
    })
  }

  openDialog(config = {}): MatDialogRef<any> {
    return this.dialog.open(DialogAddWalletComponent, {
      width: '400px',
      data: { ...config }
    })
  }

  createWallet(data: { [key: string]: boolean }) {
    const createData: { currency: string, userIdentifier: string } = { currency: '', userIdentifier: this.idMer }

    Object.keys(data).forEach(key => {
      if (data[key]) {
        createData.currency = key
      }
    })

    this.facadeCoreAdmin.createMerchantWallet(createData, this.selectedCurrency)
  }

}


































ST-1562 word logo in personal & business verifications should be displayed




<div _ngcontent-ukn-c53="" class="alert-backdrop ng-tns-c53-1 ng-trigger ng-trigger-backdropFade ng-star-inserted"></div>


  <button _ngcontent-koy-c53="" mat-stroked-button="" class="button-simple button-simple--transparent ng-tns-c53-1">Cancel</button>



  local
merchant - work
e-mail krupka.ua+2404@gmail.com
Пароль #KrupkA18@


==============================
LOCAL WORK
==============================

web-site -
e-mail kr_merchant@gmail.com
Пароль kr_merchant@gmail.com

————————————————————————-
  merchant work
e-mail krupka.ua+2404@gmail.com
Пароль #KrupkA18@


  web-site - http://localhost:4200/en/manager
e-mail kr_manager@gmail.com
Пароль kr_manager@gmail.com


web-site - http://localhost:4200/en/financiale
e-mail kr_fin-manager@gmail.com
Пароль kr_manager@gmail.com


—————————————————————————

task -
https://paydo-group.atlassian.net/browse/ST-1522
email - vasiliy.k+2404@payop.com
pass - 123456789012
conf pass - 123456789012
change pass - 87654321


task - ST-1522
email - name-st-1522@yahoo.com
pass - 123456789012
conf pass - 123456789012
change pass - 87654321
123456



==============================
STAGE WORK
==============================
PayOP [stage] - https://app.stage.payop.com/en/auth/registration
merchant - work
e-mail krupka.ua@gmail.com
Пароль #KrupkA18@


  manager - work
manager@payop.com
111111

financial - work
financial@payop.com
111111

——————————————————————————————
manager
evgen.s+manager@payop.com
eZC8s$5hH


financial
evgen.s+fin@payop.com
rc9i&8p8K

SuperAdm
nick.l+superfin@payop.com
nick.l+superfin@payop.com


________________________________
I Test ST-1562
logoDocMerchant@gmail.com

II Test ST-1562
logoDocMerchantCompany@gmail.com










bash run-docker.sh - запустить базу (engine & payop)
engine /Users/KvN/Projects/payOp/backend/docker_paydo/engine
payop /Users/KvN/Projects/payOp/backend/docker_paydo/payop/dev

make kill (остановить базу



import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { DialogTicketComponent } from './dialog-ticket/dialog-ticket.component'

export class CreateTicket {

  constructor(
    protected dialog: MatDialog
  ) {
  }

  openDialog(config): MatDialogRef<any> {
    return this.dialog.open(DialogTicketComponent, {
      width: '540px',
      panelClass: 'create-ticket-dialog',
      data: config,
      position: {top:’80px’,  right}
  })
  }

}









-> NAME: withdraw-request.component.ts
openCreateTicketModal() {
  const config = {
    isCreatedByMerchant: true,
    selectedDepartment: 4
  }

  const dialog = this.openDialog(config)

  dialog.afterClosed().subscribe((data: TicketData) => {
    if (data) {
      this.createTicket(data)
    }
  })
}

createTicket(ticketData: TicketData) {
  this.ticketFacade.postCreateTicket(ticketData)
}

















