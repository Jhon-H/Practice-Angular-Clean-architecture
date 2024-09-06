/// <reference types="@angular/localize" />

import { appConfig } from '@/configuration/app.config';
import { AppComponent } from '@/ui/app.component';
import { bootstrapApplication } from '@angular/platform-browser';

bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
