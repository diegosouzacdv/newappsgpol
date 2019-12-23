import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViaturaFichaPage } from './viatura-ficha.page';

describe('ViaturaFichaPage', () => {
  let component: ViaturaFichaPage;
  let fixture: ComponentFixture<ViaturaFichaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViaturaFichaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViaturaFichaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
