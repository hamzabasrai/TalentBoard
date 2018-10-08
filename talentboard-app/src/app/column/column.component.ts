import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Applicant } from '../model/Applicant';
import { User } from '../model/User';
import { Job } from '../model/Job';
import { SuiModalService, ModalTemplate, TemplateModalConfig } from '../../../node_modules/ng2-semantic-ui';
import { ApplicantService } from '../core/applicant.service';
import { UserService } from '../core/user.service';

export interface IContext {
  title: string;
  applicant: Applicant;
}

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css']
})
export class ColumnComponent implements OnInit {

  @Input() name: string;
  @Input() applicants: Array<Applicant> = [];

  applicant: Applicant;
  currentUser: User;
  currentJob: Job;

  @ViewChild('applicantModal')
  public applicantModal: ModalTemplate<IContext, void, void>;
  public newApplicant: Applicant = new Applicant();

  constructor(private modalService: SuiModalService, private applicantService: ApplicantService, private userService: UserService) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    this.sortItems();
  }

  removeItem(e: any) {
    const applicant: Applicant = e.dragData;
    const index = this.applicants.map((value: Applicant) => {
      return value.name;
    }).indexOf(applicant.name);
    if (index !== -1) {
      this.applicants.splice(index, 1);
    }
  }

  addItem(e: any) {
    const applicant: Applicant = e.dragData;
    applicant.status = this.name;
    this.applicantService.updateApplicant(applicant.id, applicant);
    console.log(applicant);
  }

  sortItems() {
    this.applicants.sort((a: Applicant, b: Applicant) => {
      return a.name.localeCompare(b.name);
    });
  }

  openAddApplicantModal(title: string, applicant: Applicant) {
    const config = new TemplateModalConfig<IContext, void, void>(this.applicantModal);
    config.isClosable = false;
    config.size = 'small';
    config.transition = 'fade up';
    config.transitionDuration = 400;
    config.context = { title: title, applicant: applicant };
    this.newApplicant.status = this.name;

    this.modalService
      .open(config)
      .onApprove(_ => {
        this.applicantService.addApplicant(this.newApplicant, this.currentUser.currentJobView);
      })
      .onDeny(_ => { });
  }
}
