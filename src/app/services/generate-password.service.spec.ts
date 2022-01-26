/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { GeneratePasswordService } from './generate-password.service';

describe('Service: GeneratePassword', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [GeneratePasswordService],
        });
    });

    it('should ...', inject(
        [GeneratePasswordService],
        (service: GeneratePasswordService) => {
            expect(service).toBeTruthy();
        }
    ));
});
