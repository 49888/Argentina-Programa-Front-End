import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//?Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CardComponent } from './components/card/card.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { EducationComponent } from './components/education/education.component';
import { AppRoutingModule } from './app.routing';
import { MainComponent } from './components/main/main.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ChartComponent } from './components/chart/chart.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ChartInputComponent } from './components/chart-input/chart-input.component';
import { ListCardComponent } from './components/list-card/list-card.component';
import { CardImageComponent } from './components/card/card-image.component';
import { CardTitleDescriptionComponent } from './components/card/card-title-description.component';

//?Banner
import { BannerComponent } from './components/banner/banner.component';
import { BannerImageComponent } from './components/banner/banner-image.component';
import { BannerPerfilComponent } from './components/banner/banner-perfil.component';
import { BannerTitleInfoComponent } from './components/banner/banner-title-info.component';
import { BannerRedesComponent } from './components/banner/banner-redes.component';

//?Modals
import { ModalComponent } from './components/modals/modal/modal.component';
import { ModalCropperComponent } from './components/modals/modal-cropper/modal-cropper.component';
import { ModalChartComponent } from './components/modals/modal-chart/modal-chart.component';
import { ModalDeleteComponent } from './components/modals/modal-delete/modal-delete.component';
import { ModalCreateComponent } from './components/modals/modal-create/modal-create.component';
import { ModalCreateChartComponent } from './components/modals/modal-create-chart/modal-create-chart.component';

//?NGRX
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ROOT_REDUCERS } from './state/AppState';
import { CreateEffects, DeleteEffects, LoadEffects, UpdateEffects, UpdateImageEffects } from './state/AppEffects';

//?otros
import { DB } from './services/db.service';
import { AngularCropperjsModule } from 'angular-cropperjs';
import { NgChartsModule } from 'ng2-charts';
import { LoginBackgroundComponent } from './components/login/login-background.component';
import { LoginComponent } from './components/login/login.component';
import { LoaderComponent } from './components/main/loader.component';
import { CardProjectComponent } from './components/projects/CardProject.component';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BannerComponent,
    CardComponent,
    ExperienceComponent,
    EducationComponent,
    MainComponent,
    SkillsComponent,
    ChartComponent,
    ProjectsComponent,
    ModalComponent,
    ModalCropperComponent,
    ModalChartComponent,
    ChartInputComponent,
    ModalDeleteComponent,
    ModalCreateComponent,
    ModalCreateChartComponent,
    BannerImageComponent,
    BannerPerfilComponent,
    BannerTitleInfoComponent,
    BannerRedesComponent,
    ListCardComponent,
    CardImageComponent,
    CardTitleDescriptionComponent,
    LoginBackgroundComponent,
    LoginComponent,
    LoaderComponent,
    CardProjectComponent,
    FooterComponent
  ],

  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    NgChartsModule,
    StoreModule.forRoot(ROOT_REDUCERS),
    StoreDevtoolsModule.instrument({name: 'Estado'}),
    EffectsModule.forRoot([LoadEffects, UpdateEffects, DeleteEffects, CreateEffects, UpdateImageEffects]),
    AngularCropperjsModule,
    HttpClientModule
  ],

  providers: [
    DB,

  ],
  bootstrap: [AppComponent]
})


export class AppModule { }
