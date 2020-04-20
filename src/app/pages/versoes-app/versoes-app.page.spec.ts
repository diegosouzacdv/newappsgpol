import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VersoesAppPage } from './versoes-app.page';

describe('VersoesAppPage', () => {
  let component: VersoesAppPage;
  let fixture: ComponentFixture<VersoesAppPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VersoesAppPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VersoesAppPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
