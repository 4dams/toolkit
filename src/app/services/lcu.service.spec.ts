import { TestBed } from "@angular/core/testing";

import { LcuService } from "./lcu.service";

describe("LcuService", () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it("should be created", () => {
        const service: LcuService = TestBed.get(LcuService);
        expect(service).toBeTruthy();
    });
});
