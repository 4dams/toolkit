import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PageNotFoundComponent } from "./shared/components";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
    {
        path: "",
        component: HomeComponent,
        pathMatch: "full",
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
