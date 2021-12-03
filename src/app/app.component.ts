import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";
import {LoadingService} from "./services/loading.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  public isCollapsed = true;

  constructor(
    public auth: AuthService,
    private router: Router,
    public loading: LoadingService,
    public translate: TranslateService
  ) {
    translate.addLangs(['en', 'fr'])
    translate.setDefaultLang('en')

    const browserLang = translate.getBrowserLang()

    translate.use(browserLang ? browserLang.match(/en|fr/) ? browserLang : 'en' : 'en')
  }

  logout(event: Event) {
    event.preventDefault()
    this.router.navigate(['/'])
    this.auth.logout()
  }

  ngOnInit(): void {
    this.auth.checkAuth()
  }
}
