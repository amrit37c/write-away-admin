import { TestBed } from "@angular/core/testing";

import { AgeGroupService } from "./age-group.service";

describe("AgeGroupService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: AgeGroupService = TestBed.get(AgeGroupService);
    expect(service).toBeTruthy();
  });
});
