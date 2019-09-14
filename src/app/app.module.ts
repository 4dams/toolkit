import "reflect-metadata";
import "../polyfills";

import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { CoreModule } from "./core/core.module";
import { SharedModule } from "./shared/shared.module";

import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { MenuComponent } from "./components/menu/menu.component";
import { ProfileComponent } from "./profile/profile.component";
import { MiscComponent } from "./misc/misc.component";
import { SelectComponent } from "./components/select/select.component";

@NgModule({
    declarations: [AppComponent, HomeComponent, MenuComponent, ProfileComponent, MiscComponent, SelectComponent],
    imports: [BrowserModule, FormsModule, HttpClientModule, CoreModule, SharedModule, AppRoutingModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
