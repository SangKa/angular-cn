@title
主从结构

@intro
构建一个主从结构的页面，用于展现英雄列表

@description


In this page, you'll expand the Tour of Heroes app to display a list of heroes, and
allow users to select a hero and display the hero's details.

我们需要管理多个英雄。我们将扩展《英雄指南》应用，让它显示一个英雄列表，
  允许用户选择一个英雄，查看该英雄的详细信息。

When you're done with this page, the app should look like this <live-example></live-example>.

当我们完成本章时，应用应该是这样的：<live-example></live-example>。



## Where you left off

## 延续上一步教程

Before you continue with this page of the Tour of Heroes,
verify that you have the following structure after [The Hero Editor](tutorial/toh-pt1) page.
If your structure doesn't match, go back to that page to figure out what you missed.

在继续《英雄指南》的第二部分之前，先来检查一下，完成[第一部分](tutorial/toh-pt1)之后，你是否已经有了如下目录结构。如果没有，你得先回到第一部分，看看错过了哪里。


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

在控制台中敲下列命令：


<code-example language="sh" class="code-shell">
  npm start

</code-example>



This command runs the TypeScript compiler in "watch mode", recompiling automatically when the code changes.
The command simultaneously launches the app in a browser and refreshes the browser when the code changes.

这个命令会在“监听”模式下运行TypeScript编译器，当代码变化时，它会自动重新编译。
  同时，该命令还会在浏览器中启动该应用，并且当代码变化时刷新浏览器。

You can keep building the Tour of Heroes without pausing to recompile or refresh the browser.

在后续构建《英雄指南》过程中，应用能持续运行，而不用中断服务来编译或刷新浏览器。



## Displaying heroes

## 显示我们的英雄

To display a list of heroes, you'll add heroes to the view's template.

要显示英雄列表，我们就要先往视图模板中添加一些英雄。

### Create heroes

### 创建英雄

Create an array of ten heroes.

我们先创建一个由十位英雄组成的数组。


<code-example path="toh-pt2/src/app/app.component.ts" region="hero-array" title="src/app/app.component.ts (hero array)">

</code-example>



The `HEROES` array is of type `Hero`, the class defined in the previous page.
Eventually this app will fetch the list of heroes from a web service, but for now
you can display mock heroes.

`HEROES`是一个由`Hero`类的实例构成的数组，我们在第一部分定义过它。
我们当然希望从一个 Web 服务中获取这个英雄列表，但别急，我们得把步子迈得小一点，先用一组模拟出来的英雄。

### Expose heroes

### 暴露英雄

Create a public property in `AppComponent` that exposes the heroes for binding.

我们在`AppComponent`上创建一个公共属性，用来暴露这些英雄，以供绑定。


<code-example path="toh-pt2/src/app/app.component.1.html" region="hero-array-1" title="app.component.ts (hero array property)">

</code-example>



The `heroes` type isn't defined because TypeScript infers it from the `HEROES` array.

我们并不需要明确定义`heroes`属性的数据类型，TypeScript 能从`HEROES`数组中推断出来。


<div class="l-sub-section">



The hero data is separated from the class implementation
because ultimately the hero names will come from a data service.

英雄的数据从实现类中分离了出来，因为最终，英雄的名字会来自一个数据服务。


</div>



### Display hero names in a template

### 在模板中显示英雄

To display the hero names in an unordered list,
insert the following chunk of HTML below the title and above the hero details.

我们还要在模板中创建一个无序列表来显示这些英雄的名字。
那就在标题和英雄详情之间，插入下面这段 HTML 代码。


<code-example path="toh-pt2/src/app/app.component.1.html" region="heroes-template-1" title="app.component.ts (heroes template)" linenums="false">

</code-example>



Now you can fill the template with hero names.

现在，我们有了一个模板。接下来，就用英雄们的数据来填充它。

### List heroes with ngFor

### 通过 ngFor 来显示英雄列表

The goal is to bind the array of heroes in the component to the template, iterate over them,
and display them individually.

我们想要把组件中的`heroes`数组绑定到模板中，迭代并逐个显示它们。

Modify the `<li>` tag by adding the built-in directive `*ngFor`.

首先，修改`<li>`标签，往上添加内置指令`*ngFor`。


<code-example path="toh-pt2/src/app/app.component.1.html" region="heroes-ngfor-1" title="app.component.ts (ngFor)">

</code-example>



<div class="l-sub-section">



The (`*`) prefix to `ngFor` is a critical part of this syntax.
It indicates that the `<li>` element and its children
constitute a master template.

`ngFor`的`*`前缀表示`<li>`及其子元素组成了一个主控模板。

The `ngFor` directive iterates over the component's `heroes` array
and renders an instance of this template for each hero in that array.

`ngFor`指令在`AppComponent.heroes`属性返回的`heroes`数组上迭代，并输出此模板的实例。

The `let hero` part of the expression identifies `hero` as the  template input variable,
which holds the current hero item for each iteration.
You can reference this variable within the template to access the current hero's properties.

引号中赋值给`ngFor`的那段文本表示“*从`heroes`数组中取出每个英雄，存入一个局部的`hero`变量，并让它在相应的模板实例中可用*”。

Read more about `ngFor` and template input variables in the
[Showing an array property with *ngFor](guide/displaying-data#ngFor) section of the
[Displaying Data](guide/displaying-data) page and the
[ngFor](guide/template-syntax#ngFor) section of the
[Template Syntax](guide/template-syntax) page.

要学习更多关于`ngFor`和模板输入变量的知识，参见[显示数据](guide/displaying-data)一章的[用*ngFor显示数组属性](guide/displaying-data#ngFor)和
[模板语法](guide/template-syntax)章的[ngFor](guide/template-syntax#ngFor)。


</div>



Within the `<li>` tags, add content
that uses the `hero` template variable to display the hero's properties.

接着，我们在`<li>`标签中插入一些内容，以便使用模板变量`hero`来显示英雄的属性。


<code-example path="toh-pt2/src/app/app.component.1.html" region="ng-for" title="app.component.ts (ngFor template)" linenums="false">

</code-example>



When the browser refreshes, a list of heroes appears.

当浏览器刷新时，我们就看到了英雄列表。

### Style the heroes

### 给我们的英雄们“美容”

Users should get a visual cue of which hero they are hovering over and which hero is selected.

当用户的鼠标划过英雄或选中一个英雄时，我们得让他/她看起来醒目一点。

To add styles to your component, set the `styles` property on the `@Component` decorator
to the following CSS classes:

要想给我们的组件添加一些样式，请把`@Component`装饰器的`styles`属性设置为下列 CSS 类：


<code-example path="toh-pt2/src/app/app.component.ts" region="styles" title="src/app/app.component.ts (styles)" linenums="false">

</code-example>



Remember to use the backtick notation for multi-line strings.

注意，我们又使用了反引号语法来书写多行字符串。

Adding these styles makes the file much longer. In a later page you'll move the styles to a separate file.

添加这些样式会让此文件变得更长。在后面的章节中，我们将会把这些样式移到单独的文件中去。

When you assign styles to a component, they are scoped to that specific component.
These styles apply only to the `AppComponent` and don't affect the outer HTML.

当我们为一个组件指定样式时，它们的作用域将仅限于该组件。
  上面的例子中，这些样式只会作用于`AppComponent`组件，而不会“泄露”到外部 HTML 中。

The template for displaying heroes should look like this:

用于显示英雄们的模板应该是这样的：


<code-example path="toh-pt2/src/app/app.component.1.html" region="heroes-styled" title="src/app/app.component.ts (styled heroes)" linenums="false">

</code-example>




## Selecting a hero

## 选择英雄

The app now displays a list of heroes as well as a single hero in the details view. But
the list and the details view are not connected.
When users select a hero from the list, the selected hero should appear in the details view.
This UI pattern is known as "master/detail."
In this case, the _master_ is the heroes list and the _detail_ is the selected hero.

我们的应用已经有了英雄列表和单个英雄的详情视图。
    但列表和单独的英雄之间还没有任何关联。
    我们希望用户在列表中选中一个英雄，然后让这个被选中的英雄出现在详情视图中。
    这种 UI 布局模式，通常被称为“主从结构”。
    在这个例子中，主视图是英雄列表，从视图则是被选中的英雄。

Next you'll connect the master to the detail through a `selectedHero` component property,
which is bound to a click event.

接下来，我们要通过组件中的一个`selectedHero`属性来连接主从视图，它被绑定到了点击事件上。

### Handle click events

### 处理点击事件

Add a click event binding to the `<li>` like this:

我们再往`<li>`元素上插入一句点击事件的绑定代码：  


<code-example path="toh-pt2/src/app/app.component.1.html" region="selectedHero-click" title="app.component.ts (template excerpt)" linenums="false">

</code-example>



The parentheses identify the `<li>` element's  `click` event as the target.
The `onSelect(hero)` expression calls the  `AppComponent` method, `onSelect()`,
passing the template input variable `hero`, as an argument.
That's the same `hero` variable you defined previously in the `ngFor` directive.

圆括号标识`<li>`元素上的`click`事件是绑定的目标。
    等号右边的`onSelect(hero)`表达式调用`AppComponent`的`onSelect()`方法，并把模板输入变量`hero`作为参数传进去。
    它是我们前面在`ngFor`指令中定义的那个`hero`变量。


<div class="l-sub-section">



Learn more about event binding at the
[User Input](guide/user-input) page and the
[Event binding](guide/template-syntax#event-binding) section of the
[Template Syntax](guide/template-syntax) page.

关于事件绑定的更多内容，参见：
      [用户输入](guide/user-input)页 和
      [模板语法](guide/template-syntax)页的[事件绑定](guide/template-syntax#event-binding)节。


</div>



### Add a click handler to expose the selected hero

### 添加点击处理器以暴露选中的英雄

You no longer need the `hero` property because you're no longer displaying a single hero; you're displaying a list of heroes.
But the user will be able to select one of the heroes by clicking on it.
So replace the `hero` property with this simple `selectedHero` property:

我们不再需要`AppComponent`的`hero`属性，因为不需要再显示单个的英雄，我们只需要显示英雄列表。但是用户可以点选一个英雄。
所以我们要把`hero`属性**替换**成`selectedHero`属性。


<code-example path="toh-pt2/src/app/app.component.ts" region="selected-hero" title="src/app/app.component.ts (selectedHero)">

</code-example>



The hero names should all be unselected before the user picks a hero, so
you won't initialize the `selectedHero` as you did with `hero`.

在用户选取一个英雄之前，所有的英雄名字都应该是未选中的。所以我们不希望像`hero`一样初始化`selectedHero`变量。

Add an `onSelect()` method that sets the `selectedHero` property to the `hero` that the user clicks.

现在，**添加一个`onSelect`方法**，用于将用户点击的英雄赋给`selectedHero`属性。


<code-example path="toh-pt2/src/app/app.component.ts" region="on-select" title="src/app/app.component.ts (onSelect)" linenums="false">

</code-example>



The template still refers to the old `hero` property.
Bind to the new `selectedHero` property instead as follows:

我们将把所选英雄的详细信息显示在模板中。目前，它仍然引用之前的`hero`属性。
我们这就修改模板，让它绑定到新的`selectedHero`属性。  


<code-example path="toh-pt2/src/app/app.component.1.html" region="selectedHero-details" title="app.component.ts (template excerpt)" linenums="false">

</code-example>



### Hide the empty detail with ngIf

### 使用 ngIf 隐藏空的详情

When the app loads, `selectedHero` is undefined.
The selected hero is initialized when the user clicks a hero's name.
Angular can't display properties of the undefined `selectedHero` and throws the following error,
visible in the browser's console:

当应用加载时，我们会看到一个英雄列表，但还没有任何英雄被选中。
`selectedHero`属性是`undefined`。
因此，我们会看到浏览器控制台中出现下列错误：


<code-example format="nocode">
  EXCEPTION: TypeError: Cannot read property 'name' of undefined in [null]

</code-example>



Although `selectedHero.name` is displayed in the template,
you must keep the hero detail out of the DOM until there is a selected hero.

虽然我们要在模板中显示的是`selectedHero.name`，但在选中了一个英雄之前，我们必须让这些英雄详情留在DOM之外。

Wrap the HTML hero detail content of the template with a `<div>`.
Then add the `ngIf` built-in directive and set it to the `selectedHero` property of the component.

我们可以把模板中的英雄详情内容区放在一个`<div>`中。
    然后，添加一个`ngIf`内置指令，把`ngIf`的值设置为组件的`selectedHero`属性。


<code-example path="toh-pt2/src/app/app.component.1.html" region="ng-if" title="src/app/app.component.ts (ngIf)" linenums="false">

</code-example>



<div class="alert is-critical">



Don't forget the asterisk (`*`) in front of `ngIf`.

别忘了`ngIf`前的星号 (`*`)。


</div>



The app no longer fails and the list of names displays again in the browser.

应用不再出错，而名字列表也再次显示在浏览器中。


When there is no selected hero, the `ngIf` directive removes the hero detail HTML from the DOM.
There are no hero detail elements or bindings to worry about.

当没有选中英雄时，`ngIf`指令会从 DOM 中移除表示英雄详情的这段 HTML 。
    没有了表示英雄详情的元素，也就不用担心绑定问题。

When the user picks a hero, `selectedHero` becomes defined and
`ngIf` puts the hero detail content into the DOM and evaluates the nested bindings.

当用户选取了一个英雄，`selectedHero`变成了“已定义的”值，于是`ngIf`把英雄详情加回 DOM 中，并计算它所嵌套的各种绑定。


<div class="l-sub-section">



Read more about `ngIf` and `ngFor` in the
[Structural Directives](guide/structural-directives) page and the
[Built-in directives](guide/template-syntax#directives) section of the
[Template Syntax](guide/template-syntax) page.


要了解更多`ngIf`，`ngFor`和其它结构型指令的信息，参见
[结构型指令](guide/structural-directives)和
[模板语法](guide/template-syntax)章的[内置指令](guide/template-syntax#directives)部分。


</div>



### Style the selected hero

### 给所选英雄添加样式

While the selected hero details appear below the list, it's difficult to identify the selected hero within the list itself.

我们在下面的详情区看到了选中的英雄，但是我们还是没法在上面的列表区快速定位这位英雄。

In the `styles` metadata that you added above, there is a custom CSS class named `selected`.
To make the selected hero more visible, you'll apply this `selected` class to the `<li>` when the user clicks on a hero name.
For example, when the user clicks "Magneta", it should render with a distinctive but subtle background color
like this:

在我们前面添加的`styles`元数据中，有一个名叫`selected`的自定义CSS类。
要想让选中的英雄更加醒目，当用户点击一个英雄名字时，我们要为`<li>`添加`selected`类。
例如，当用户点击“Magneta”时，它应该使用不一样的醒目的背景色。


<figure>
  <img src='generated/images/guide/toh/heroes-list-selected.png' alt="选中的英雄">
</figure>



In the template, add the following `[class.selected]` binding to  the `<li>`:

在这个模板中，往`<li>`上添加一个`[class.selected]`绑定：


<code-example path="toh-pt2/src/app/app.component.1.html" region="class-selected-1" title="app.component.ts (setting the CSS class)" linenums="false">

</code-example>



When the expression (`hero === selectedHero`) is `true`, Angular adds the `selected` CSS class.
When the expression is `false`, Angular removes the `selected` class.

当表达式(`hero === selectedHero`)为`true`时，Angular会添加一个CSS类`selected`。为`false`时则会移除`selected`类。



<div class="l-sub-section">



Read more about the `[class]` binding in the [Template Syntax](guide/template-syntax#ngClass "Template syntax: NgClass") guide.

关于`[class]`绑定的更多信息，参见[模板语法](guide/template-syntax#ngClass "Template syntax: NgClass")。


</div>



The final version of the `<li>` looks like this:


<code-example path="toh-pt2/src/app/app.component.1.html" region="class-selected-2" title="app.component.ts (styling each hero)" linenums="false">

</code-example>



After clicking "Magneta", the list should look like this:

浏览器重新加载了我们的应用。
我们选中英雄 Magneta，通过背景色的变化，它被清晰的标记出来。


<figure>
  <img src='generated/images/guide/toh/heroes-list-1.png' alt="英雄列表应用的输出">
</figure>



Here's the complete `app.component.ts` as of now:

完整的`app.component.ts`文件如下：


<code-example path="toh-pt2/src/app/app.component.ts" title="src/app/app.component.ts">

</code-example>




## The road you've travelled

## 已走的路

Here's what you achieved in this page:

在本章中，我们完成了以下内容：

* The Tour of Heroes app displays a list of selectable heroes.

  我们的《英雄指南》现在显示一个可选英雄的列表
  
* You added the ability to select a hero and show the hero's details.

  我们可以选择英雄，并显示这个英雄的详情
  
* You learned how to use the built-in directives `ngIf` and `ngFor` in a component's template.

  我们学会了如何在组件模板中使用内置的`ngIf`和`ngFor`指令

## The road ahead

## 前方的路

You've expanded the Tour of Heroes app, but it's far from complete.
An app shouldn't be one monolithic component.
In the [next page](tutorial/toh-pt3 "Multiple Components"), you'll split the app into subcomponents and make them work together.

我们的《英雄指南》长大了，但还远远不够完善。
我们显然不能把整个应用都放进一个组件中。
我们将在[下一章](tutorial/toh-pt3)把它拆分成一系列子组件，然后教它们协同工作。