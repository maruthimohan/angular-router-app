import { Component, OnInit, HostBinding } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import { Observable } from 'rxjs';

import { Crisis } from '../crisis';
import { mergeMap, switchMap } from 'rxjs/operators';
import {CrisisService} from '../crisis.service';
// import { DialogService }  from '../../dialog.service';

@Component({
  selector: 'app-crisis-detail',
  templateUrl: './crisis-detail.component.html',
  styleUrls: ['./crisis-detail.component.css']
})
export class CrisisDetailComponent implements OnInit {
  crisis$: Observable<Crisis>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private crisisService: CrisisService
  ) {}

  ngOnInit() {
    this.crisis$ = this.route.paramMap.pipe(
      switchMap((param: ParamMap) => {
        return this.crisisService.getCrisis(param.get('id'));
      })
    );
  }

  cancel(crisis: Crisis) {
    this.gotoCrises(crisis);
  }

  save(crisis: Crisis) {
    // this.crisis.name = this.editName;
    this.gotoCrises(crisis);
  }

  /*canDeactivate(): Observable<boolean> | boolean {
    // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
    if (!this.crisis || this.crisis.name === this.editName) {
      return true;
    }
    // Otherwise ask the user with the dialog service and return its
    // observable which resolves to true or false when the user decides
    return this.dialogService.confirm('Discard changes?');
  }*/

  gotoCrises(crisis: Crisis) {
    const crisisId = crisis ? crisis.id : null;
    // Pass along the crisis id if available
    // so that the CrisisListComponent can select that crisis.
    // Add a totally useless `foo` parameter for kicks.
    // Relative navigation back to the crises
    this.router.navigate(['../', { id: crisisId, foo: 'foo' }], { relativeTo: this.route });
  }
}
