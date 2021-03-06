# Angular Reference Sheet
Note that the official Angular docs are available at https://angular.io/docs, but this reference sheet displays all the necessary information that pertains to our application.
# Setup
First, you need to make sure that node.js and npm package manager are installed. To install node.js, go to https://nodejs.org/en/, or if on Unix use the command `sudo apt install nodejs`. Angular uses libraries that can be managed with npm. For windows, npm should automatically be installed with node.js. On Unix, it can be installed with `sudo apt install npm`.

## Step 1: Install the Angular CLI
CLI stands for command line interface, which means the Angular CLI's function is to provide an interface to the Angular Framework. It can be used to create projects, generate application and library code, and perform a variety of ongoing development tasks. To install the CLI, use the command `npm install -g @angular/cli`, which installs the cli globally on your machine. Note: this may take root access to install so try adding `sudo` to beginning of command if installation fails.

## Step 2: Create a Workspace
**This step can be skipped if cloning the project from github, but can be useful for setting up a test application to get familiar with creating a workspace.** In Angular, apps are developed in the context of a *workspace*. To create a new workspace and initial project, run the cli command `ng new [app-name]`. The Angular CLI installs the necessary dependencies and creates an app that is ready to run.

## Step 3: Run the application
Angular CLI comes with a built in server that can compile and launch a workspace with two commands. First, change to the project directory (in this case our comic book project workspace, which is located at `/EE461L_Project/frontend/icdb`). Once you are in the workspace folder, you can launch the server with the command `ng serve --open`. At this point, the Angular CLI launches the server that runs your workspace and watches your workspace files and rebuilds the app when you make changes to those files. The --open (or -o) flag automatically opens a browser tab with a connection to the server.

The full startup tutorial can be found at https://angular.io/guide/setup-local.

# Problems starting appliction with solutions
* When running `ng serve --open` in the workspace folder, compilation fails with the error: `An unhandled exception occurred: Cannot find module '@angular-devkit/build-angular/package.json'`
  * Run `npm install --save-dev @angular-devkit/build-angular`
  * Run `ng serve --open`
* When running `ng serve --open` in the workspace folder, it fails because you have multiple Angular servers running already.
  * Run `ng update @angular/core --next`. You might need to commit or stash any unsaved git changes.
  
# Architecture
## Basic Overview
The basic building blocks of an angular application are *modules* and *components*. Components define *views*, or sets of screen elements to be displayed, and can use *services*, which provide extra functionality not related to the view. Services can be *injected* into components as a *dependency*. Modules define a compilation context for components. An app always has a root module and typically more feature modules.

## Components
Components define a class that contains the app's data and logic. Separately, they control a *view*, or the template for how everything should be rendered on the screen. For phase I, we will need to create 14 components, per the 14 static pages requirement. Skip to Modules now if following for Phase I.

## Modules
An Angular *NgModules* declares a compilation context for a set of components that is dedicated to an application domain. An NgModule can associate its components with related code, such as services, to form functional units. Every Angular app has a root module, typically named *AppModule* that bootstraps the application.

Like Javascript modules (or Java packages), NgModules can import functionality from other NgModules or export their own functionality. Skip to Navigation now if following for Phase I.

# Navigation
The Angular *router* NgModule is a service that lets you define the navigation path among the different application states in the app. It's usage is similar to conventional browser navigation:
* Enter a URL in the address bar and the browswer navigates to a corresponding page.
* Click links on the page and the router navigates to a new page.
* Click the browser's back and forward buttons and the router navigates accordingly.
In Angular's case, the router maps URL's to *views* instead of pages. 

## `<Base>` Element
The `<base>` element can be added as the first child in the `<head>` tag of an index.html file. Using the `href` attribute, this element tells the router how to compose navigation URL's for this view. For example, if we are adding this element to an index.html file that in a folder that is the application root, the element should look like `<base href="/">`.

## Importing the Router
Since the router module is an optional service and is not part of the Angular core, we will need to import it into the component that wishes to use it. Import it by adding `import { RouterModule, Routes } from '@angular/router';` to the top of the component file (`.ts`) that wishes to use it.

## Configuration
There is only one singleton instance of an Angular router for per application. When the browser's URL changes, that router looks for a corresponding *Route* from which it can determine the component to display. A router has no routes until you add some.

To configure a router, we must give it a list of route definitions. Each route definition is defined as a *Route Object* which has two fields: 
1. A *path*, or the URL path for this route.
1. A *component*, or the component associated with this route.
Once we define our list of route definitions, we pass it to the RouterModule.forRoot() method. This method returns a module that contains the configured Router service provider. Essentially, it makes the router service available everywhere in the application. An example `src/app/app-routing.module.ts` file is below.
```
import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { CrisisListComponent }   from './crisis-list/crisis-list.component';
import { HeroListComponent }     from './hero-list/hero-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: 'crisis-center', component: CrisisListComponent },
  { path: 'heroes',        component: HeroListComponent },
  { path: '',   redirectTo: '/heroes', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
```
Now, in the `src/app/app.module.ts` file, we must import the routing module with `import { AppRoutingModule } from './app-routing.module';` and add it to the NgModule import: 
```
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  ```

# Data Flow
As stated earier, *components* make up the data structure of an Angular application. The HTML *template* associated with a component is Angular's mechanism for displaying a component's data. *Data binding* is the process of displaying data on the template or collecting data from the user. You can also add actual logic to the template (html page) in the form of module directives.

## Different Types of Data Binding
This subsection goes over the different types of data binding and what they mean.

### Interpolation
Anytime you see double brackets `{{ }}` in the view, that is *interpolation*. This operator creates a string to display from the property that is in between the brackets. The property is often a simple variable in the component's class. More generally, however, the text in between the brackets is simply an expression that Angular evaluates and then turns into a string. For example, `{{ 1 + 1 }}` will display `2`. You can also invoke methods in the component's class.

### Property Binding
For this section, it helps to remember that a *property* is the component equivalent of a class variable in Java. Additionally, it helps to think of standard html elements as Angular components, with their attributes being similar to a component's property. For example, a `<img>` element has a `src` attribute in standard html, but it helps to think of `<img>` as a whole component with `src` as a property, or variable, of that component. *Property binding* refers to the process of setting a component's property from the view element, whether that component be an actual Angular component you created or it is simply a standard html tag. We do this in a similar way to interpolation, specifically setting the property to an expression that Angular evaluates and turns into a string. Using our `<img>` example, if we wanted to bind the `src` property to `expression`, we do this: `<img [src]="expression">`. Here, the expression is in quotes instead of double brackets. It is important to remember that you can also set values of components in this way. This can also be used to set styles and such. For example, `[style.width]="width"`.

### Event Binding
Often times we wish to describe our app's behavior when some event happens, for example what method to call when a button is clicked. This isn't exactly a property, so we need slightly different syntax. Additionally, we are assigning a *statement* rather than an *expression* to the event. For example, `<button (click)="deleteHero()">Delete hero</button>` calls the method `deleteHero()` when the button is clicked. 

### Two-Way Binding
**The data binding we have gone over so far is all unidirectional, meaning it goes from the component's class to the view or from the view to the class. We will now go over bidirectional dataflow**. Bidirectional is useful for enabling more efficient handling of user interaction. Rather than pushing values and pulling values to the HTML, we could simply declare *bindings* between sources and the view that Angular will be able to handle. Specifically, bidirectional binding does two things:
1. Set a specific element property
2. Listens for an element change event

The syntax for two-way binding is `[()]`. To understand why this feature is useful, it is helpful to first develop some motivation. Imagine a situation where a font size is initially set by a property `initSize` in the root component. In this application, imagine another button that changes the font size by changing the value of a different property in a different child component. To implement two-way binding, there are a few things we need to do. First, in the child component we need to create the property `size` that sets the font size and mark it as `@Input()`. We also need to create an `EventEmitter` and mark it with `@Output()`. When the button is clicked that changes the font size property in the child component, it should not only change the value of that property but also call `emit()` on the `EventEmitter`. Now, in the root component view template, we can write:
```
<child-component [(size)]="initSize"></child-component>
<div [style.font-size.px]="initSize">Resizable Text</div>
```
Now, the font size is automatically updated on the button click. Of course, this can be done with two one-way data binds, but a single bi-directional data bind is a more seamless implmentation. Lastly, since this intends to increase user interaction functionality, it helps to think of this data flow as **view->class->view**.

Here is a link to the full docs over this information if you are still confused over anything: https://angular.io/guide/template-syntax.

### @Input() and @Output()
These decorators are mainly used to mark component properties for passing data between parent and child components. Think of `@Input()` as allowing data to flow from the parent to the child and `@Output()` as passing an *Observable* from the child to the parent.

# Services
A service is a broad category that defines a value, function, or feature that does something specific and does it well. Typically, a service does things like fetch data from a server, verfiy an account login, or log information. In Angualar, services are *injected* into components as *dependencies*.

## Dependecy Injection
To mark a feature as a service, you need to use the `@Injectable()` decorator. Additionally, you need to register a provider for the service with the app-wide *injector* (we'll go over how to do that in just a bit). To use a service in a component, you need to import that service into the component and then add it to the component's constructor. For example, a component that needs to use the `HeroService` (an example service on the Angular docs) will have a constructor that looks like this: `constructor(private service: HeroService) { }`.

## Providing Services
Now we will go over how to register a provider for a service with the app's injector. You register a provider in the metadata of a service (in the `@Injectable()` decorator). Luckily, you can create a service using the CLI with `ng generate service` that will come pre-registered with the root injector. The service's metadata will look like this:
```
@Injectable({
 providedIn: 'root',
})
```
Providing a service at the root level creates a single, shared instance of the service and injects it into any class that asks for it.

# Helpful Definitions
* Workspace - A collection of Angular projects that are powered by the Angular CLI and are typically located in a single-source version control directory like git.
