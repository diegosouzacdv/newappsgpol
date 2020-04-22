import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InserirVersaoPage } from './inserir-versao.page';

describe('InserirVersaoPage', () => {
  let component: InserirVersaoPage;
  let fixture: ComponentFixture<InserirVersaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InserirVersaoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InserirVersaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
