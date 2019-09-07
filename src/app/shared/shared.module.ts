import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PageNotFoundComponent } from "./components/";
import { WebviewDirective } from "./directives/";

@NgModule({
    declarations: [PageNotFoundComponent, WebviewDirective],
    imports: [CommonModule],
    exports: [WebviewDirective],
})
export class SharedModule {}
