# Npm Packages

# npm 包

Angular applications and Angular itself depend upon features and functionality provided by a variety of third-party packages.
These packages are maintained and installed with the Node Package Manager (<a href="https://docs.npmjs.com/">npm</a>).

Angular应用程序以及Angular本身都依赖于很多第三方包(包括Angular自己)提供的特性和功能。
这些包由Node包管理器(<a href="https://docs.npmjs.com/" target="_blank">npm</a>)负责安装和维护。


<div class="l-sub-section">



Node.js and npm are essential to Angular development. 

Node.js和npm是做Angular开发的基础。

<a href="https://docs.npmjs.com/getting-started/installing-node" title="Installing Node.js and updating npm">
Get them now</a> if they're not already installed on your machine.

如果你的电脑上还没有装过，请<a href="https://docs.npmjs.com/getting-started/installing-node" target="_blank" title="Installing Node.js and updating npm">立即获取它</a>！

**Verify that you are running node `v4.x.x` or higher and npm `3.x.x` or higher**
by running the commands `node -v` and `npm -v` in a terminal/console window.
Older versions produce errors.

通过在终端/控制台窗口中运行`node -v`和`npm -v`命令，来**验证下你是否正在使用node `v4.x.x`和npm `3.x.x`**。
    过老的版本有可能出现问题。

Consider using [nvm](https://github.com/creationix/nvm) for managing multiple
versions of node and npm. You may need [nvm](https://github.com/creationix/nvm) if
you already have projects running on your machine that use other versions of node and npm.

我们建议使用[nvm](https://github.com/creationix/nvm)来管理node和npm的多个版本。如果你机器上已经有某些项目运行了node和npm的其它版本，你就会需要[nvm](https://github.com/creationix/nvm)了。


</div>



During [Setup](guide/setup), a <a href="https://docs.npmjs.com/files/package.json">package.json</a>
file is installed with a comprehensive starter set of
packages as specified in the `dependencies` and `devDependencies` sections.

我们在[搭建本地开发环境](guide/setup)一章中安装并解释了<a href="https://docs.npmjs.com/files/package.json" target="_blank">package.json</a>文件的
  `dependencies`和`devDependencies`区中指定了一组适用于新手的综合依赖包。

You can use other packages but the packages in _this particular set_ work well together and include
everything you need to build and run the sample applications in this series.

你当然可以使用其它包，不过这一组可以很好的协同工作，而且包含了我们在个系列文档中构建和运行范例应用时所需的一切。


<div class="l-sub-section">



Note: A cookbook or guide page may require an additional library such as *jQuery*.

注意：烹饪宝典或开发指南中的页面可能需要其它库，比如*jQuery*。


</div>



You'll install more than you need for the QuickStart guide.
No worries!
You only serve to the client those packages that the application actually requests.

它们远远超过了我们将在“快速上手”中所需要用到的。
实际上，它比我们在大多数应用中需要的还多。
安装的包比我们实际需要的包多，其实并没有什么坏处。
我们最终只会往客户端发送程序中实际用到的那些包。

This page explains what each package does. You can make substitutions later to suit your tastes and experience.

本页面会解释每一个包是干什么的，以后你就可以根据自己的喜好和经验，随意替换它们了。



## *dependencies* and *devDependencies*

## *dependencies*和*devDependencies*

The `package.json` includes two sets of packages,
[dependencies](guide/npm-packages#dependencies) and [devDependencies](guide/npm-packages#dev-dependencies).

`package.json`包含两组包：[dependencies](guide/npm-packages#dependencies)和[devDependencies](guide/npm-packages#dev-dependencies)。

The *dependencies* are essential to *running* the application. 
The *devDependencies* are only necessary to *develop* the application. 
You can exclude them from production installations by adding `--production` to the install command, as follows:

*dependencies*下的这些包是*运行*本应用的基础，而*devDependencies*下的只在*开发*此应用时才用得到。
通过为`install`命令添加`--production`参数，你在产品环境下安装时排除*devDependencies*下的包，就像这样：


<code-example format="." language="bash">
  npm install my-application --production

</code-example>



{@a dependencies}



## *dependencies*

## *dependencies* 依赖

The `dependencies` section of `package.json` contains:

应用程序的`package.json`文件中，`dependencies`区下有三类包：

* ***Features*** : Feature packages give the application framework and utility capabilities.

  **特性*** - 特性包为应用程序提供了框架和工具方面的能力。
  
* ***Polyfills*** : Polyfills plug gaps in the browser's JavaScript implementation.

  ***填充(Polyfills)*** - 填充包弥合了不同浏览器上的JavaScript实现方面的差异。
  
* ***Other*** : Other libraries that support the application such as `bootstrap` for HTML widgets and styling.
  
  ***其它*** - 其它库对本应用提供支持，比如`bootstrap`包提供了HTML中的小部件和样式。



### Feature Packages

### 特性包

***@angular/core*** : Critical runtime parts of the framework needed by every application. 
Includes all metadata decorators, `Component`, `Directive`,  dependency injection, and the component lifecycle hooks.

***@angular/core*** - 框架中关键的运行期部件，每一个应用都需要它。
包括所有的元数据装饰器：`Component`、`Directive`，依赖注入系统，以及组件生命周期钩子。

***@angular/common*** : The commonly needed services, pipes, and directives provided by the Angular team.

***@angular/common*** - 常用的那些由Angular开发组提供的服务、管道和指令。

***@angular/compiler*** : Angular's *Template Compiler*. 
It understands templates and can convert them to code that makes the application run and render. 
Typically you don’t interact with the compiler directly; rather, you use it indirectly via `platform-browser-dynamic` or the offline template compiler.

***@angular/compiler*** - Angular的*模板编译器*。
它会理解模板，并且把模板转化成代码，以供应用程序运行和渲染。
开发人员通常不会直接跟这个编译器打交道，而是通过`platform-browser-dynamic`或离线模板编译器间接使用它。

***@angular/platform-browser*** : Everything DOM and browser related, especially the pieces that help render into theDOM.
This package also includes the `bootstrapStatic()` method for bootstrapping applications for production builds that pre-compile templates offline.

***@angular/platform-browser*** - 与DOM和浏览器相关的每样东西，特别是帮助往DOM中渲染的那部分。
这个包还包含bootstrapStatic方法，用来引导那些在产品构建时需要离线预编译模板的应用程序。

***@angular/platform-browser-dynamic*** : Includes [Providers](api/core/Provider) and a [bootstrap](guide/ngmodule#bootstrap) method for applications that
compile templates on the client. Don’t use offline compilation.
Use this package for bootstrapping during development and for bootstrapping plunker samples.

***@angular/platform-browser-dynamic*** - 为应用程序提供一些[提供商](api/core/Provider)和[bootstrap](guide/ngmodule#bootstrap)方法，以便在客户端编译模板。不要用于离线编译。
我们使用这个包在开发期间引导应用，以及引导plunker中的范例。

***@angular/http*** : Angular's HTTP client.

***@angular/http*** - Angular的HTTP客户端。

***@angular/router*** : Component router.

***@angular/router*** - 路由器。

***@angular/upgrade*** : Set of utilities for upgrading AngularJS applications to Angular.

***@angular/upgrade*** - 一组用于升级AngularJS应用的工具。

***[system.js](https://github.com/systemjs/systemjs)*** :  A dynamic module loader compatible with the 
[ES2015 module](http://www.2ality.com/2014/09/es6-modules-final.html) specification.
Other viable choices include the well-regarded [webpack](https://webpack.github.io/).

***[system.js](https://github.com/systemjs/systemjs)*** -  是一个动态的模块加载器，
与[ES2015模块](http://www.2ality.com/2014/09/es6-modules-final.html)规范兼容。
还有很多其它选择，比如广受欢迎的[webpack](https://webpack.github.io/)。
SystemJS被用在了我们的文档范例中。因为它能工作。

Your future applications are likely to require additional packages that provide
HTML controls, themes, data access, and various utilities.

今后，应用程序很可能还会需要更多的包，比如HTML控件、主题、数据访问，以及其它多种工具。


{@a polyfills}



### Polyfill packages

### 填充(Polyfill)包

Angular requires certain [polyfills](https://en.wikipedia.org/wiki/Polyfill) in the application environment.
Install these polyfills using the npm packages that Angular lists in the *peerDependencies* section of its `package.json`.

在应用程序的运行环境中，Angular需要某些[填充库](https://en.wikipedia.org/wiki/Polyfill)。
我们通过特定的npm包来安装这些填充库，Angular本身把它列在了`package.json`中的*peerDependencies*区。

You must list these packages in the `dependencies` section of your own `package.json`.

但我们必须把它列在我们`package.json`文件的`dependencies`区。


<div class="l-sub-section">



For background on this requirement, see [Why peerDependencies?](guide/npm-packages#why-peer-dependencies).

查看下面的“[为什么用peerDependencies?](guide/npm-packages#why-peer-dependencies)”，以了解这项需求的背景。


</div>



***core-js***: Patches the global context (window) with essential features of ES2015 (ES6).
 You may substitute an alternative polyfill that provides the same core APIs.
 When these APIs are implemented by the major browsers, this dependency will become unnecessary.
 
***core-js*** - 为全局上下文(window)打的补丁，提供了ES2015(ES6)的很多基础特性。
我们也可以把它换成提供了相同内核API的其它填充库。
一旦所有的“主流浏览器”都实现了这些API，这个依赖就可以去掉了。

***rxjs*** : A polyfill for the [Observables specification](https://github.com/zenparsing/es-observable) currently before the 
[TC39](http://www.ecma-international.org/memento/TC39.htm) committee that determines standards for the JavaScript language.
You can pick a preferred version of *rxjs* (within a compatible version range)
without waiting for Angular updates.

***rxjs*** - 一个为[可观察对象(Observable)规范](https://github.com/zenparsing/es-observable)提供的填充库，该规范已经提交给了
[TC39](http://www.ecma-international.org/memento/TC39.htm)委员会，以决定是否要在JavaScript语言中进行标准化。
开发人员应该能在兼容的版本中选择一个喜欢的*rxjs*版本，而不用等Angular升级。

***zone.js*** : A polyfill for the [Zone specification](https://gist.github.com/mhevery/63fdcdf7c65886051d55) currently before the 
[TC39](http://www.ecma-international.org/memento/TC39.htm) committee that determines standards for the JavaScript language.
You can pick a preferred version of *zone.js* to use (within a compatible version range)
without waiting for Angular updates.

***zone.js*** - 一个为[Zone规范](https://gist.github.com/mhevery/63fdcdf7c65886051d55)提供的填充库，该规范已经提交给了
[TC39](http://www.ecma-international.org/memento/TC39.htm)委员会，以决定是否要在JavaScript语言中进行标准化。
开发人员应该能在兼容的版本中选择一个喜欢的*zone.js*版本，而不用等Angular升级。


{@a other}



### Other helper libraries

### 其它辅助库

***angular-in-memory-web-api*** : An Angular-supported library that simulates a remote server's web api 
without requiring an actual server or real HTTP calls. 
Good for demos, samples, and early stage development (before you even have a server).

***angular-in-memory-web-api*** - 一个Angular的支持库，它能模拟一个远端服务器的Web API，而不需要依赖一个真实的服务器或发起真实的HTTP调用。
对演示、文档范例和开发的早期阶段(那时候我们可能还没有服务器呢)非常有用。

***bootstrap*** : [Bootstrap](http://getbootstrap.com/) is a popular HTML and CSS framework for designing responsive web apps.
Some of the samples improve their appearance with *bootstrap*.

***bootstrap*** - [bootstrap](http://getbootstrap.com/)是一个广受欢迎的HTML和CSS框架，可用来设计响应式网络应用。
有些文档中的范例使用了*bootstrap*来强化它们的外观。


{@a dev-dependencies}



## *devDependencies*

## *devDependencies* 依赖

The packages listed in the *devDependencies* section of the `package.json` help you develop the application.
You don't have to deploy them with the production application although there is no harm in doing so.

列在`package.json`文件中*devDependencies*区的包会帮助我们开发该应用程序。
我们不用把它们部署到产品环境的应用程序中 —— 虽然这样做也没什么坏处。

***[concurrently](https://www.npmjs.com/package/concurrently)*** : 
A utility to run multiple *npm* commands concurrently on OS/X, Windows, and Linux operating systems.

***[concurrently](https://www.npmjs.com/package/concurrently)*** - 一个用来在OS/X、Windows和Linux操作系统上同时运行多个*npm*命令的工具
***[lite-server](https://www.npmjs.com/package/lite-server)*** : 
A light-weight, static file server, by [John Papa](http://johnpapa.net/) 
with excellent support for Angular apps that use routing.

***[lite-server](https://www.npmjs.com/package/lite-server)*** - 一个轻量级、静态的服务器，
由[John Papa](http://johnpapa.net/)开发和维护。对使用到路由的Angular程序提供了很好的支持。

***[typescript](https://www.npmjs.com/package/typescript)*** : 
the TypeScript language server, including the *tsc* TypeScript compiler.

***[typescript](https://www.npmjs.com/package/typescript)*** - TypeScript语言的服务器，包含了TypeScript编译器*tsc*。

***@types/\* *** : TypeScript definition files.
Learn more about it in the [TypeScript Configuration](guide/typescript-configuration#typings) guide.

***@types/\**** - “TypeScript定义”文件管理器。
要了解更多，请参见[TypeScript配置](guide/typescript-configuration#typings)页。



{@a why-peer-dependencies}


## Why *peerDependencies*?

## 为什么使用*peerDependencies*？

There isn't a [*peerDependencies*](https://nodejs.org/en/blog/npm/peer-dependencies/) section in the QuickStart `package.json`. 
But Angular has a *peerDependencies* section in 
*its* `package.json`, which has important consequences for your application. 

在“快速上手”的`package.json`文件中，并没有[*peerDependencies*](https://nodejs.org/en/blog/npm/peer-dependencies/)区。
但是Angular本身在*它自己的* `package.json` 中有，
它对我们的应用程序有重要的影响。

This section explains why you load the [polyfill](guide/npm-packages#polyfills) *dependency* packages in the QuickStart application's`package.json`,
and why you'll need those packages in your own applications.

它解释了为什么我们要在“快速上手”的`package.json`文件中加载这些[填充库(polyfill)](guide/npm-packages#polyfills)依赖包，
以及为什么我们在自己的应用中会需要它们。

An explanation of [peer dependencies](https://nodejs.org/en/blog/npm/peer-dependencies/) follows.

然后是对[平级依赖(peer dependencies)](https://nodejs.org/en/blog/npm/peer-dependencies/)的简短解释。

Packages depend on other packages. For example, your application depends on the Angular package.

每个包都依赖其它的包，比如我们的应用程序就依赖于Angular包。

Two packages, "A" and "B", could depend on the same third package "C". 
"A" and "B" might both list "C" among their *dependencies*.

两个包，“A”和“B”，可能依赖共同的第三个包“C”。
"A"和“B”可能都在它们的*dependencies*中列出了“C”。

What if "A" and "B" depend on different versions of "C" ("C1" and "C2"). The npm package system supports that. 
It installs "C1" in the `node_modules` folder for "A" and "C2" in the `node_modules` folder for "B".
Now "A" and "B" have their own copies of "C" and they run without interferring with one another.

如果“A”和“B”依赖于“C”的不同版本("C1"和“C2”)。npm包管理系统也能支持！
它会把“C1”安装到“A”的`node_modules`目录下给“A”用，把“C2”安装到“B”的`node_modules`目录下给“B”用。
现在，“A”和“B”都有了它们自己的一份“C”的复本，它们运行起来也互不干扰。

But there is a problem. Package "A" may require the presence of "C1" without actually calling upon it directly.
"A" may only work if *everyone is using "C1"*. It falls down if any part of the application relies on "C2".

但是有一个问题。包“A”可能只需要“C1”出现就行，而实际上并不会直接调用它。
"A"可能只有当*每个人都使用“C1”时*才能正常工作。如果程序中的任何一个部分依赖了“C2”，它就会失败。

The solution is for "A" to declare that "C1" is a *peer dependency*.

要想解决这个问题，“A”就需要把“C1”定义为它的*平级依赖*。

The difference between a `dependency` and a `peerDependency` is roughly this:

在`dependencies`和`peerDependencies`之间的区别大致是这样的：

>A **dependency** says, "I need this thing directly available to *me*."
>
>**dependency**说：“我需要这东西*对我*是直接可用的。”
>
>A **peerDependency** says, "If you want to use me, you need this thing available to *you*."
>
>**peerDependency**说：“如果你想使用我，你得先确保这东西*对你*是可用的”

The Angular `package.json` specifies several *peer dependency* packages, 
each pinned to a particular version of a third-party package.

Angular就存在这个问题。
因此，Angular的`package.json`中指定了一系列*平级依赖*包，
把每个第三方包都固定在一个特定的版本上。

### You must install Angular's *peerDependencies* yourself.

### 我们必须自己安装Angular的*peerDependencies*。

When *npm* installs packages listed in *your* `dependencies` section,
it also installs the packages listed within *their* packages `dependencies` sections.
The process is recursive.

当*npm*安装那些在*我们的*`dependencies`区指定的包时，
它也会同时安装上在*那些包*的`dependencies`区所指定的那些包。
这个安装过程是递归的。

However, as of version 3, *npm* does *not* install packages listed in *peerDependencies* sections.

但是在npm的第三版中，*它不会*安装列在*peerDependencies*区的那些包。

This means that when your application installs Angular, ***npm* doesn't automatically install
the packages listed in Angular's *peerDependencies* section**.

这意味着，当我们的应用程序安装Angular时，***npm*将不会自动安装列在Angular的*peerDependencies*区的那些包**

Fortunately, *npm* issues a warning (a) When any *peer dependencies* are missing, or (b)
When the application or any of its other dependencies
installs a different version of a *peer dependency*. 

幸运的是，*npm*会在下列情况下给我们警告：(a) 当任何*平级依赖*缺失时 或(b) 当应用程序或它的任何其它依赖安装了与*平级依赖*不同版本的包时。

These warnings guard against accidental failures due to version mismatches.
They leave you in control of package and version resolution.

这些警告可以避免因为版本不匹配而导致的意外错误。
它们让我们可以控制包和版本的解析过程。

It is your responsibility to list all *peer dependency* packages **among your own *devDependencies***.

我们的责任是，把所有*平级依赖*包都**列在我们自己的*devDependencies*中**。


<div class="l-sub-section">



#### The future of *peerDependencies*

#### *peerDependencies*的未来

The Angular polyfill dependencies are hard requirements. Currently, there is no way to make them optional.

Angular的填充库依赖只是一个给开发人员的建议或提示，以便它们知道Angular期望用什么。
它们不应该像现在一样是硬需求，但目前我们也不知道该如何把它们设置为可选的。

However, there is an npm feature request for "optional peerDependencies," which would allow you to model this relationship better. 
When this feature request is implemented, Angular will switch from *peerDependencies* to *optionalPeerDependencies* for all polyfills.

不过，有一个npm的新特性申请，叫做“可选的peerDependencies”，它将会允许我们更好的对这种关系建模。
一旦它被实现了，Angular将把所有填充库从*peerDependencies*区切换到*optionalPeerDependencies*去。

</div>

