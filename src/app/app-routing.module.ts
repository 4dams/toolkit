import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { ProfileComponent } from "./profile/profile.component";
import { MiscComponent } from "./misc/misc.component";
import { ChampSelectComponent } from "./champ-select/champ-select.component";

const routes: Routes = [
    {
        path: "",
        component: HomeComponent,
        pathMatch: "full",
    },
    {
        path: "profile",
        component: ProfileComponent,
    },
    {
        path: "champselect",
        component: ChampSelectComponent,
    },
    {
        path: "misc",
        component: MiscComponent,
    },
    {
        path: "**",
        redirectTo: "",
        // component: PageNotFoundComponent
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
