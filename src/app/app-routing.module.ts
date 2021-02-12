import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/auth-guard';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostsCreateComponent } from './posts/posts-create/posts-create.component';

const routes: Routes = [
  { path: '', component: PostListComponent}, // root page
  { path: 'auth', loadChildren: () => import('./auth/auth.moudle').then(m => m.AuthModule)},
  { path: 'create', component: PostsCreateComponent, canActivate: [AuthGuard]},
  { path: 'edit/:postId', component: PostsCreateComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
