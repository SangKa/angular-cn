@title
服务

@intro
创建一个可复用的服务来调用英雄的数据

@description


As the Tour of Heroes app evolves, you'll add more components that need access to hero data.

随着《英雄指南》的成长，我们要添加更多需要访问英雄数据的组件。

Instead of copying and pasting the same code over and over,
you'll create a single reusable data service and
inject it into the components that need it.
Using a separate service keeps components lean and focused on supporting the view,
and makes it easy to unit-test components with a mock service.

为了不再把相同的代码复制一遍又一遍，我们要创建一个单一的可复用的数据服务，并且把它注入到需要它的那些组件中。
使用单独的服务可以保持组件精简，使其集中精力为视图提供支持，并且，借助模拟（Mock）服务，可以更容易的对组件进行单元测试。

Because data services are invariably asynchronous,
you'll finish the page with a *Promise*-based version of the data service.

由于数据服务总是异步的，因此我们最终会提供一个基于承诺（Promise）的数据服务。

When you're done with this page, the app should look like this <live-example></live-example>.

当我们完成本章的内容是，本应用会变成这样：<live-example></live-example>。



## Where you left off

## 延续上一步教程

Before continuing with the Tour of Heroes, verify that you have the following structure.
If not, go back to the previous pages.

在继续《英雄指南》之前，先检查一下，是否已经有如下目录结构。如果没有，回上一章，看看错过了哪里。


<div class='filetree'>

  <div class='file'>
    angular-tour-of-heroes
  </div>

  <div class='children'>

    <div class='file'>
      src
    </div>

    <div class='children'>

      <div class='file'>
        app
      </div>

      <div class='children'>

        <div class='file'>
          app.component.ts
        </div>

        <div class='file'>
          app.module.ts
        </div>

        <div class='file'>
          hero.ts
        </div>

        <div class='file'>
          hero-detail.component.ts
        </div>

      </div>

      <div class='file'>
        main.ts
      </div>

      <div class='file'>
        index.html
      </div>

      <div class='file'>
        styles.css
      </div>

      <div class='file'>
        systemjs.config.js
      </div>

      <div class='file'>
        tsconfig.json
      </div>

    </div>

    <div class='file'>
      node_modules ...
    </div>

    <div class='file'>
      package.json
    </div>

  </div>

</div>



## Keep the app transpiling and running

## 让应用代码保持转译和运行

Enter the following command in the terminal window:

在终端窗口中输入如下命令：


<code-example language="sh" class="code-shell">
  npm start

</code-example>



This command runs the TypeScript compiler in "watch mode", recompiling automatically when the code changes.
The command simultaneously launches the app in a browser and refreshes the browser when the code changes.

这个命令会在“监听”模式下运行TypeScript编译器，当代码变化时，它会自动重新编译。
  同时，该命令还会在浏览器中启动该应用，并且当代码变化时刷新浏览器。

You can keep building the Tour of Heroes without pausing to recompile or refresh the browser.

在后续构建《英雄指南》过程中，应用能持续运行，而不用中断服务来编译或刷新浏览器。

## Creating a hero service

## 创建英雄服务

The stakeholders want to show the heroes in various ways on different pages.
Users can already select a hero from a list.
Soon you'll add a dashboard with the top performing heroes and create a separate view for editing hero details.
All three views need hero data.

客户向我们描绘了本应用更大的目标：想要在不同的页面中用多种方式显示英雄。
  现在我们已经能从列表中选择一个英雄了，但这还不够。
  很快，我们将添加一个仪表盘来显示表现最好的英雄，并创建一个独立视图来编辑英雄的详情。
  所有这些视图都需要英雄数据。

At the moment, the `AppComponent` defines mock heroes for display.
However, defining heroes is not the component's job,
and you can't easily share the list of heroes with other components and views.
In this page, you'll move the hero data acquisition business to a single service that provides the data and
share that service with all components that need the data.

目前，`AppComponent`显示的是模拟数据。
不过，定义这些英雄并非组件的任务，否则我们没法与其它组件和视图共享这些英雄列表数据。
在这一章，我们将把获取英雄数据的任务重构为一个单独的服务，它将提供英雄数据，并把服务在所有需要英雄数据的组件间共享。

### Create the HeroService

### 创建 HeroService  

Create a file in the `app` folder called `hero.service.ts`. 

在`app`目录下创建一个名叫`hero.service.ts`的文件。


<div class="l-sub-section">



The naming convention for service files is the service name in lowercase followed by `.service`.
For a multi-word service name, use lower [dash-case](guide/glossary#dash-case).
For example, the filename for `SpecialSuperHeroService` is `special-super-hero.service.ts`.

我们遵循的文件命名约定是：服务名称的小写形式（基本名），加上`.service`后缀。
如果服务名称包含多个单词，我们就把基本名部分写成中线形式 ([dash-case](guide/glossary#dash-case))。
例如，`SpecialSuperHeroService`服务应该被定义在`special-super-hero.service.ts`文件中。


</div>



Name the class `HeroService` and export it for others to import.

我们把这个类命名为`HeroService`，并导出它，以供别人使用。


<code-example path="toh-pt4/src/app/hero.service.1.ts" region="empty-class" title="src/app/hero.service.ts (starting point)" linenums="false">

</code-example>



### Injectable services

### 可注入的服务

Notice that you imported the Angular `Injectable` function and applied that function as an `@Injectable()` decorator.

注意，我们导入了 Angular 的`Injectable`函数，并作为`@Injectable()`装饰器使用这个函数。


<div class="callout is-helpful">



Don't forget the parentheses. Omitting them leads to an error that's difficult to diagnose.

**不要忘了写圆括号！**如果忘了写，就会导致一个很难诊断的错误。


</div>



The `@Injectable()` decorator tells TypeScript to emit metadata about the service.
The metadata specifies that Angular may need to inject other dependencies into this service.

当 TypeScript 看到`@Injectable()`装饰器时，就会记下本服务的元数据。
  如果 Angular 需要往这个服务中注入其它依赖，就会使用这些元数据。

Although the `HeroService` doesn't have any dependencies at the moment,
applying the `@Injectable()` decorator ​from the start ensures
consistency and future-proofing.

虽然*此时*`HeroService`还没有任何依赖，但我们还是得加上这个装饰器。
作为一项最佳实践，无论是出于提高统一性还是减少变更的目的，
都应该从一开始就加上`@Injectable()`装饰器。


### Getting hero data

### 获取英雄数据  

Add a `getHeroes()` method stub.

添加一个名叫`getHeros`的桩方法。


<code-example path="toh-pt4/src/app/hero.service.1.ts" region="getHeroes-stub" title="src/app/hero.service.ts (getHeroes stub)" linenums="false">

</code-example>



The `HeroService` could get `Hero` data from anywhere&mdash;a
web service, local storage, or a mock data source.
Removing data access from the component means
you can change your mind about the implementation anytime,
without touching the components that need hero data.

`HeroService`可以从任何地方获取`Hero`数据 —— Web服务、本地存储或模拟数据源。
从组件中移除数据访问逻辑意味着你可以随时更改这些实现方式，而不影响需要这些英雄数据的组件。

### Move the mock hero data

### 移动模拟的英雄数据

Cut the `HEROES` array from `app.component.ts` and paste it to a new file in the `app` folder named `mock-heroes.ts`.
Additionally, copy the `import {Hero} ...` statement because the heroes array uses the `Hero` class.

从`app.component.ts`文件中剪切`HEROS`数组，把它粘贴到`app`目录下一个名叫`mock-heroes.ts`的文件中。
还要复制`import {Hero}...`语句，因为我们的英雄数组用到了`Hero`类。


<code-example path="toh-pt4/src/app/mock-heroes.ts" title="src/app/mock-heroes.ts">

</code-example>



The `HEROES` constant is exported so it can be imported elsewhere, such as the `HeroService`.

我们导出了`HEROES`常量，以便可以在其它地方导入它 &mdash; 例如`HeroService`服务。

In `app.component.ts`, where you cut the `HEROES` array,
add an uninitialized `heroes` property:

在刚刚剪切出`HEROES`数组的`app.component.ts`文件中，添加一个尚未初始化的`heroes`属性：


<code-example path="toh-pt4/src/app/app.component.1.ts" region="heroes-prop" title="src/app/app.component.ts (heroes property)" linenums="false">

</code-example>



### Return mocked hero data

### 返回模拟的英雄数据

Back in the `HeroService`, import the mock `HEROES` and return it from the `getHeroes()` method.
The `HeroService` looks like this:

回到`HeroService`，我们导入`HEROES`常量，并在`getHeroes`方法中返回它。
我们的`HeroService`服务现在是这样的：


<code-example path="toh-pt4/src/app/hero.service.1.ts" region="full" title="src/app/hero.service.ts" linenums="false">

</code-example>



### Import the hero service

### 导入HeroService

You're ready to use the `HeroService` in other components, starting with `AppComponent`.

我们可以在多个组件中使用 HeroService 服务了，先从 AppComponent 开始。

Import the `HeroService` so that you can reference it in the code.

先导入`HeroService`，以便我们可以在代码中引用它。


<code-example path="toh-pt4/src/app/app.component.ts" linenums="false" title="src/app/app.component.ts (hero-service-import)" region="hero-service-import">

</code-example>



### Don't use *new* with the *HeroService*

### 不要`new`出`HeroService`

How should the `AppComponent` acquire a runtime concrete `HeroService` instance?

该如何在运行中获得一个具体的`HeroService`实例呢？

You could create a new instance of the `HeroService` with `new` like this:

你可能想用`new`来创建`HeroService`的实例，就像这样：


<code-example path="toh-pt4/src/app/app.component.1.ts" region="new-service" title="src/app/app.component.ts" linenums="false">

</code-example>



However, this option isn't ideal for the following reasons:

但这不是个好主意，有很多理由，例如：

* The component has to know how to create a `HeroService`.
If you change the `HeroService` constructor,
you must find and update every place you created the service.
Patching code in multiple places is error prone and adds to the test burden.

  我们的组件得弄清楚该如何创建`HeroService`。
    如果有一天我们修改了`HeroService`的构造函数，我们不得不找出创建过此服务的每一处代码，并修改它。
    围着补丁代码转圈很容易导致错误，还会增加测试负担。
    
* You create a service each time you use `new`.
What if the service caches heroes and shares that cache with others?
You couldn't do that.

  我们每次使用`new`都会创建一个新的服务实例。
    如果这个服务需要缓存英雄列表，并把这个缓存共享给别人呢？怎么办？
    没办法，做不到。
    
* With the `AppComponent` locked into a specific implementation of the `HeroService`,
switching implementations for different scenarios, such as operating offline or using
different mocked versions for testing, would be difficult.

  我们把`AppComponent`锁定到`HeroService`的一个特定实现。
    我们很难在不同的场景中切换实现。
    例如，能离线操作吗？能在测试时使用不同的模拟版本吗？这可不容易。

### Inject the *HeroService*

### 注入 *HeroService*

Instead of using the *new* line, you'll add two lines.

你可以用两行代码代替用`new`时的一行：

 * Add a constructor that also defines a private property.
 
   添加一个构造函数，并定义一个私有属性。
  
 * Add to the component's `providers` metadata.
 
   添加组件的`providers`元数据。

Add the constructor:

添加构造函数：


<code-example path="toh-pt4/src/app/app.component.1.ts" region="ctor" title="src/app/app.component.ts (constructor)">

</code-example>



The constructor itself does nothing. The parameter simultaneously
defines a private `heroService` property and identifies it as a `HeroService` injection site.

构造函数自己什么也不用做，它在参数中定义了一个私有的`heroService`属性，并把它标记为注入`HeroService`的靶点。


Now Angular knows to supply an instance of the `HeroService` when it creates an `AppComponent`.

现在，当创建`AppComponent`实例时，Angular 知道需要先提供一个`HeroService`的实例。


<div class="l-sub-section">



Read more about dependency injection in the [Dependency Injection](guide/dependency-injection) page.

更多依赖注入的信息，见[依赖注入](guide/dependency-injection)。


</div>



The *injector* doesn't know yet how to create a `HeroService`.
If you ran the code now, Angular would fail with this error:

*注入器*还不知道该如何创建`HeroService`。
如果现在运行我们的代码，Angular 就会失败，并报错：


<code-example format="nocode">
  EXCEPTION: No provider for HeroService! (AppComponent -> HeroService)
  (异常：没有 HeroService 的提供商！(AppComponent -> HeroService))

</code-example>



To teach the injector how to make a `HeroService`,
add the following `providers` array property to the bottom of the component metadata
in the `@Component` call.

我们还得注册一个`HeroService`**提供商**，来告诉*注入器*如何创建`HeroService`。
要做到这一点，我们在`@Component`组件的元数据底部添加`providers`数组属性如下：


<code-example path="toh-pt4/src/app/app.component.1.ts" linenums="false" title="src/app/app.component.ts (providers)" region="providers">

</code-example>



The `providers` array  tells Angular to create a fresh instance of the `HeroService` when it creates an `AppComponent`.
The `AppComponent`, as well as its child components, can use that service to get hero data.

`providers`数组告诉 Angular，当它创建新的`AppComponent`组件时，也要创建一个`HeroService`的新实例。
`AppComponent`会使用那个服务来获取英雄列表，在它组件树中的每一个子组件也同样如此。


{@a child-component}


### *getHeroes()* in the *AppComponent*

### *AppComponent* 中的 *getHeroes()*

The service is in a `heroService` private variable.

该服务被存入了一个私有变量`heroService`中。

You could call the service and get the data in one line.

我们可以在同一行内调用此服务，并获得数据。


<code-example path="toh-pt4/src/app/app.component.1.ts" region="get-heroes" title="src/app/app.component.ts" linenums="false">

</code-example>



You don't really need a dedicated method to wrap one line.  Write it anyway:

在真实的世界中，我们并不需要把一行代码包装成一个专门的方法，但无论如何，我们在演示代码中先这么写：


<code-example path="toh-pt4/src/app/app.component.1.ts" linenums="false" title="src/app/app.component.ts (getHeroes)" region="getHeroes">

</code-example>

{@a oninit}

### The *ngOnInit* lifecycle hook

### *ngOnInit* 生命周期钩子

`AppComponent` should fetch and display hero data with no issues.

毫无疑问，`AppComponent`应该获取英雄数据并显示它。

 You might be tempted to call the `getHeroes()` method in a constructor, but
a constructor should not contain complex logic,
especially a constructor that calls a server, such as a data access method.
The constructor is for simple initializations, like wiring constructor parameters to properties.

你可能想在构造函数中调用`getHeroes()`方法，但构造函数不应该包含复杂的逻辑，特别是那些需要从服务器获取数据的逻辑更是如此。构造函数是为了简单的初始化工作而设计的，例如把构造函数的参数赋值给属性。

To have Angular call `getHeroes()`, you can implement the Angular *ngOnInit lifecycle hook*.
Angular offers interfaces for tapping into critical moments in the component lifecycle:
at creation, after each change, and at its eventual destruction.

只要我们实现了 Angular 的 **ngOnInit** *生命周期钩子*，Angular 就会主动调用这个钩子。
Angular提供了一些接口，用来介入组件生命周期的几个关键时间点：刚创建时、每次变化时，以及最终被销毁时。

Each interface has a single method. When the component implements that method, Angular calls it at the appropriate time.

每个接口都有唯一的一个方法。只要组件实现了这个方法，Angular 就会在合适的时机调用它。


<div class="l-sub-section">



Read more about lifecycle hooks in the [Lifecycle Hooks](guide/lifecycle-hooks) page.

更多生命周期钩子信息，见[生命周期钩子](guide/lifecycle-hooks)。


</div>



Here's the essential outline for the `OnInit` interface (don't copy this into your code):

这是`OnInit`接口的基本轮廓（但不要拷贝到你自己的代码中）：


<code-example path="toh-pt4/src/app/app.component.1.ts" region="on-init" title="src/app/app.component.ts" linenums="false">

</code-example>



Add the implementation for the `OnInit` interface to your export statement:

往export语句中添加`OnInit`接口的实现：


<code-example format="nocode">
  export class AppComponent implements OnInit {}

</code-example>



Write an `ngOnInit` method with the initialization logic inside. Angular will call it
at the right time. In this case, initialize by calling `getHeroes()`.

我们写了一个带有初始化逻辑的`ngOnInit`方法，Angular会在适当的时候调用它。
  在这个例子中，我们通过调用`getHeroes()`来完成初始化。


<code-example path="toh-pt4/src/app/app.component.1.ts" linenums="false" title="src/app/app.component.ts (ng-on-init)" region="ng-on-init">

</code-example>



The app should run as expected, showing a list of heroes and a hero detail view
when you click on a hero name.

我们的应用将会像期望的那样运行，显示英雄列表，并且在我们点击英雄的名字时，显示英雄的详情。
{@a async}

## Async services and Promises

## 异步服务与承诺

The `HeroService` returns a list of mock heroes immediately;
its `getHeroes()` signature is synchronous.

我们的`HeroService`立即返回一个模拟的英雄列表，它的`getHeroes()`函数签名是同步的。


<code-example path="toh-pt4/src/app/app.component.1.ts" region="get-heroes" title="src/app/app.component.ts" linenums="false">

</code-example>



Eventually, the hero data will come from a remote server.
When using a remote server, users don't have to wait for the server to respond;
additionally, you aren't able to block the UI during the wait.

但最终，英雄的数据会从远端服务器获取。当使用远端服务器时，用户不会等待服务器的响应。换句话说，你没法在等待期间阻塞浏览器界面。


To coordinate the view with the response, 
you can use *Promises*, which is an asynchronous 
technique that changes the signature of the `getHeroes()` method.

为了协调视图与响应，我们可以使用*承诺（Promise）*，它是一种异步技术，它会改变`getHeroes()`方法的签名。

### The hero service makes a Promise

### `HeroService`会生成一个承诺

A *Promise* essentially promises to call back when the results are ready.
You ask an asynchronous service to do some work and give it a callback function.
The service does that work and eventually calls the function with the results or an error.

**承诺** 就是 …… 好吧，它就是一个承诺，在有了结果时，它承诺会回调我们。
我们请求一个异步服务去做点什么，并且给它一个回调函数。
它会去做（在某个地方），一旦完成，它就会调用我们的回调函数，并通过参数把工作结果或者错误信息传给我们。


<div class="l-sub-section">



This is a simplified explanation. Read more about ES2015 Promises in the
[Promises for asynchronous programming](http://exploringjs.com/es6/ch_promises.html) page of
[Exploring ES6](http://exploringjs.com/es6.html).

这里只是粗略说说，要了解更多 ES2015 Promise 的信息，见[ES6概览](http://http://exploringjs.com/es6.html)中的[承诺与异步编程](http://exploringjs.com/es6/ch_promises.html)。


</div>



Update the `HeroService` with this Promise-returning `getHeroes()` method:

把`HeroService`的`getHeroes`方法改写为返回承诺的形式：


<code-example path="toh-pt4/src/app/hero.service.ts" region="get-heroes" title="src/app/hero.service.ts (excerpt)" linenums="false">

</code-example>



You're still mocking the data. You're simulating the behavior of an ultra-fast, zero-latency server,
by returning an *immediately resolved Promise* with the mock heroes as the result.

我们继续使用模拟数据。我们通过返回一个 *立即解决的承诺* 的方式，模拟了一个超快、零延迟的超级服务器。

### Act on the Promise

### 基于承诺的行动

As a result of the change to `HeroService`, `this.heroes` is now set to a `Promise` rather than an array of heroes.

修改`HeroService`之后，`this.heroes`会被赋值为一个`Promise`而不再是英雄数组。


<code-example path="toh-pt4/src/app/app.component.1.ts" region="getHeroes" title="src/app/app.component.ts (getHeroes - old)" linenums="false">

</code-example>



You have to change the implementation to *act on the `Promise` when it resolves*.
When the `Promise` resolves successfully, you'll have heroes to display.

我们得修改这个实现，把它变成*基于承诺*的，并在承诺的事情被解决时再行动。
  一旦承诺的事情被成功解决（Resolve），我们就会显示英雄数据。

Pass the callback function as an argument to the Promise's `then()` method:

我们把回调函数作为参数传给承诺对象的**then**方法：


<code-example path="toh-pt4/src/app/app.component.ts" region="get-heroes" title="src/app/app.component.ts (getHeroes - revised)" linenums="false">

</code-example>



<div class="l-sub-section">



As described in [Arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions),
the ES2015 arrow function
in the callback is more succinct than the equivalent function expression and gracefully handles `this`.

回调中所用的 [ES2015 箭头函数](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
比等价的函数表达式更加简洁，能优雅的处理 *this* 指针。


</div>



The callback sets the component's `heroes` property to the array of heroes returned by the service.

在回调函数中，我们把服务返回的英雄数组赋值给组件的`heroes`属性。

The app is still running, showing a list of heroes, and
responding to a name selection with a detail view.

我们的程序仍在运行，仍在显示英雄列表，在选择英雄时，仍然会把它/她显示在详情页面中。


<div class="l-sub-section">



At the end of this page, [Appendix: take it slow](tutorial/toh-pt4#slow) describes what the app might be like with a poor connection.

查看附录中的“[慢！](tutorial/toh-pt4#slow)”，来了解在较差的网络连接中这个应用会是什么样的。


</div>



## Review the app structure

## 回顾本应用的结构

Verify that you have the following structure after all of your refactoring:

再检查下，经历了本章的所有重构之后，应该有了下列文件结构：


<div class='filetree'>

  <div class='file'>
    angular-tour-of-heroes
  </div>

  <div class='children'>

    <div class='file'>
      src
    </div>

    <div class='children'>

      <div class='file'>
        app
      </div>

      <div class='children'>

        <div class='file'>
          app.component.ts
        </div>

        <div class='file'>
          app.module.ts
        </div>

        <div class='file'>
          hero.ts
        </div>

        <div class='file'>
          hero-detail.component.ts
        </div>

        <div class='file'>
          hero.service.ts
        </div>

        <div class='file'>
          mock-heroes.ts
        </div>

      </div>

      <div class='file'>
        main.ts
      </div>

      <div class='file'>
        index.html
      </div>

      <div class='file'>
        styles.css
      </div>

      <div class='file'>
        systemjs.config.js
      </div>

      <div class='file'>
        tsconfig.json
      </div>

    </div>

    <div class='file'>
      node_modules ...
    </div>

    <div class='file'>
      package.json
    </div>

  </div>

</div>



Here are the code files discussed in this page.

下面是本章讨论过的代码文件：


<code-tabs>

  <code-pane title="src/app/hero.service.ts" path="toh-pt4/src/app/hero.service.ts">

  </code-pane>

  <code-pane title="src/app/app.component.ts" path="toh-pt4/src/app/app.component.ts">

  </code-pane>

  <code-pane title="src/app/mock-heroes.ts" path="toh-pt4/src/app/mock-heroes.ts">

  </code-pane>

</code-tabs>



## The road you've travelled

## 走过的路

Here's what you achieved in this page:

来盘点一下我们完成了什么。

* You created a service class that can be shared by many components.

  我们创建了一个能被多个组件共享的服务类。

* You used the `ngOnInit` lifecycle hook to get the hero data when the `AppComponent` activates.

  我们使用了`ngOnInit`生命周期钩子，以便在`AppComponent`激活时获取英雄数据。

* You defined the `HeroService` as a provider for the `AppComponent`.

  我们把`HeroService`定义为`AppComponent`的一个提供商。

* You created mock hero data and imported them into the service.

  我们创建了模拟的英雄数据，并把它导入我们的服务中。

* You designed the service to return a Promise and the component to get the data from the Promise.

  我们把服务设计为返回承诺，组件从承诺中获取数据。

Your app should look like this <live-example></live-example>.

现在应用变成了这样：<live-example></live-example>。

## The road ahead

## 前方的路

The Tour of Heroes has become more reusable using shared components and services.
The next goal is to create a dashboard, add menu links that route between the views, and format data in a template.
As the app evolves, you'll discover how to design it to make it easier to grow and maintain.

通过使用共享组件和服务，我们的《英雄指南》更有复用性了。
  我们还要创建一个仪表盘，要添加在视图间路由的菜单链接，还要在模板中格式化数据。
  随着我们应用的进化，我们还会学到如何进行设计，让它更易于扩展和维护。

Read about the Angular component router and navigation among the views in the [next tutorial](tutorial/toh-pt5 "Routing and Navigation") page.

我们将在[下一章](tutorial/toh-pt5)学习 Angular 组件路由，以及在视图间导航的知识。

{@a slow}

## Appendix: Take it slow

## 附件：慢一点……

To simulate a slow connection,
import the `Hero` symbol and add the following `getHeroesSlowly()` method to the `HeroService`.

我们可以模拟慢速连接。导入`Hero`类，并且在`HeroService`中添加如下的`getHeroesSlowly()`方法：


<code-example path="toh-pt4/src/app/hero.service.ts" region="get-heroes-slowly" title="app/hero.service.ts (getHeroesSlowly)" linenums="false">

</code-example>



Like `getHeroes()`, it also returns a `Promise`.
But this Promise waits two seconds before resolving the Promise with mock heroes.

像`getHeroes()`一样，它也返回一个承诺。
但是，这个承诺会在提供模拟数据之前等待两秒钟。

Back in the `AppComponent`, replace `getHeroes()` with `getHeroesSlowly()`
and see how the app behaves.

回到`AppComponent`，用`heroService.getHeroesSlowly()`替换`heroService.getHeroes()`，并观察应用的行为。
