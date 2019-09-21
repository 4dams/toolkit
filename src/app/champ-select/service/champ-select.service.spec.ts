import { TestBed } from "@angular/core/testing";

import { ChampSelectService } from "./champ-select.service";

describe("ChampSelectService", () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it("should be created", () => {
        const service: ChampSelectService = TestBed.get(ChampSelectService);
        expect(service).toBeTruthy();
    });
});
