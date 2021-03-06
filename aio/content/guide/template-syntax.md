# Template Syntax

# 模板语法

<style>
  h4 {font-size: 17px !important; text-transform: none !important;}
  .syntax { font-family: Consolas, 'Lucida Sans', Courier, sans-serif; color: black; font-size: 85%; }
  h4 .syntax { font-size: 100%; }
</style>

The Angular application manages what the user sees and can do, achieving this through the interaction of a
component class instance (the *component*) and its user-facing template.

Angular 应用管理着用户之所见和所为，并通过 Component 类的实例（*组件*）和面向用户的模板来与用户交互。

You may be familiar with the component/template duality from your experience with model-view-controller (MVC) or model-view-viewmodel (MVVM).
In Angular, the component plays the part of the controller/viewmodel, and the template represents the view.

从使用模型-视图-控制器 (MVC) 或模型-视图-视图模型 (MVVM) 的经验中，很多开发人员都熟悉了组件和模板这两个概念。
  在 Angular 中，组件扮演着控制器或视图模型的角色，模板则扮演视图的角色。
  
This page is a comprehensive technical reference to the Angular template language.
It explains basic principles of the template language and describes most of the syntax that you'll encounter elsewhere in the documentation.

这是一篇关于 Angular 模板语言的技术大全。
它解释了模板语言的基本原理，并描述了我们将在文档中其它地方遇到的大部分语法。

Many code snippets illustrate the points and concepts, all of them available
in the <live-example title="Template Syntax Live Code"></live-example>.

这里还有很多代码片段用来解释技术点和概念，它们全都在<live-example title="模板语法的在线例子"></live-example>中。

{@a html}
## HTML in templates

## 模板中的HTML

HTML is the language of the Angular template.
Almost all HTML syntax is valid template syntax.
The `<script>` element is a notable exception;
it is forbidden, eliminating the risk of script injection attacks.
In practice, `<script>` is ignored and a warning appears in the browser console.
See the [Security](guide/security) page for details.

HTML 是 Angular 模板的语言。几乎所有的HTML语法都是有效的模板语法。
但值得注意的例外是`<script>`元素，它被禁用了，以阻止脚本注入攻击的风险。（实际上，`<script>`只是被忽略了。）
参见[安全](guide/security)页了解详情。

Some legal HTML doesn't make much sense in a template.
The `<html>`, `<body>`, and `<base>` elements have no useful role.
Pretty much everything else is fair game.

有些合法的 HTML 被用在模板中是没有意义的。`<html>`、`<body>`和`<base>`元素这个舞台上中并没有扮演有用的角色。剩下的所有元素基本上就都一样用了。

You can extend the HTML vocabulary of your templates with components and directives that appear as new elements and attributes.
In the following sections, you'll learn how to get and set DOM (Document Object Model) values dynamically through data binding.

可以通过组件和指令来扩展模板中的 HTML 词汇。它们看上去就是新元素和属性。接下来将学习如何通过数据绑定来动态获取/设置 DOM（文档对象模型）的值。

Begin with the first form of data binding&mdash;interpolation&mdash;to see how much richer template HTML can be.

我们首先看看数据绑定的第一种形式 —— 插值表达式，它展示了模板的 HTML 可以有多丰富。

<a href="#top-of-page">back to top</a>

<a href="#top-of-page">回到顶部</a>

<hr/>

{@a interpolation}

## Interpolation ( <span class="syntax">{&#xfeff;{...}}</span> )

## 插值表达式 ( <span class="syntax">{&#xfeff;{...}}</span> )

You met the double-curly braces of interpolation, `{{` and `}}`, early in your Angular education.

在以前的 Angular 教程中，我们遇到过由双花括号括起来的插值表达式，`{{`和`}}`。


<code-example path="template-syntax/src/app/app.component.html" region="first-interpolation" title="src/app/app.component.html" linenums="false">
</code-example>

You use interpolation to weave calculated strings into the text between HTML element tags and within attribute assignments.

插值表达式可以把计算后的字符串插入到 HTML 元素标签内的文本或对标签的属性进行赋值。


<code-example path="template-syntax/src/app/app.component.html" region="title+image" title="src/app/app.component.html" linenums="false">
</code-example>

The text between the braces is often the name of a component property. Angular replaces that name with the
string value of the corresponding component property. In the example above, Angular evaluates the `title` and `heroImageUrl` properties
and "fills in the blanks", first displaying a bold application title and then a heroic image.

在括号之间的“素材”，通常是组件属性的名字。Angular 会用组件中相应属性的字符串值，替换这个名字。
  上例中，Angular 计算`title`和`heroImageUrl`属性的值，并把它们填在空白处。
  首先显示粗体的应用标题，然后显示英雄的图片。

More generally, the text between the braces is a **template expression** that Angular first **evaluates**
and then **converts to a string**. The following interpolation illustrates the point by adding the two numbers:

一般来说，括号间的素材是一个**模板表达式**，Angular 先**对它求值**，再把它**转换成字符串**。
  下列插值表达式通过把括号中的两个数字相加说明了这一点：


<code-example path="template-syntax/src/app/app.component.html" region="sum-1" title="src/app/app.component.html" linenums="false">
</code-example>

The expression can invoke methods of the host component such as `getVal()`, seen here:

这个表达式可以调用宿主组件的方法，就像下面用的`getVal()`：


<code-example path="template-syntax/src/app/app.component.html" region="sum-2" title="src/app/app.component.html" linenums="false">
</code-example>

Angular evaluates all expressions in double curly braces,
converts the expression results to strings, and links them with neighboring literal strings. Finally,
it assigns this composite interpolated result to an **element or directive property**.

Angular 对所有双花括号中的表达式求值，把求值的结果转换成字符串，并把它们跟相邻的字符串字面量连接起来。最后，把这个组合出来的插值结果赋给**元素或指令的属性**。

You appear to be inserting the result between element tags and assigning it to attributes.
It's convenient to think so, and you rarely suffer for this mistake.
Though this is not exactly true. Interpolation is a special syntax that Angular converts into a
[property binding](guide/template-syntax#property-binding), as is explained [below](guide/template-syntax#property-binding-or-interpolation).

表面上看，我们在元素标签之间插入了结果和对标签的属性进行了赋值。
这样思考起来很方便，并且这个误解很少给我们带来麻烦。
但严格来讲，这是不对的。插值表达式是一个特殊的语法，Angular 把它转换成了[属性绑定](guide/template-syntax#property-binding)，[后面](guide/template-syntax#property-binding-or-interpolation)将会解释这一点。

But first, let's take a closer look at template expressions and statements.

讲解属性绑定之前，先深入了解一下模板表达式和模板语句。

<a href="#top-of-page">back to top</a>

<a href="#top-of-page">回到顶部</a>

<hr/>

{@a template-expressions}

## Template expressions

## 模板表达式

A template **expression** produces a value.
Angular executes the expression and assigns it to a property of a binding target;
the target might be an HTML element, a component, or a directive.

模板**表达式**产生一个值。
  Angular 执行这个表达式，并把它赋值给绑定目标的属性，这个绑定目标可能是 HTML 元素、组件或指令。

The interpolation braces in `{{1 + 1}}` surround the template expression `1 + 1`.
In the [property binding](guide/template-syntax#property-binding) section below,
a template expression appears in quotes to the right of the&nbsp;`=` symbol as in `[property]="expression"`.

`{{1 + 1}}`中所包含的模板表达式是`1 + 1`。
  在[属性绑定](guide/template-syntax#property-binding)中会再次看到模板表达式，它出现在`=`右侧的引号中，就像这样：`[property]="expression"`。

You write these template expressions in a language that looks like JavaScript.
Many JavaScript expressions are legal template expressions, but not all.

编写模板表达式所用的语言看起来很像 JavaScript。
  很多 JavaScript 表达式也是合法的模板表达式，但不是全部。

JavaScript expressions that have or promote side effects are prohibited,
including:

JavaScript 中那些具有或可能引发副作用的表达式是被禁止的，包括：

* assignments (`=`, `+=`, `-=`, ...)

  赋值 (`=`, `+=`, `-=`, ...)
  
* <code>new</code>

  `new`运算符
  
* chaining expressions with <code>;</code> or <code>,</code>

  使用`;`或`,`的链式表达式
  
* increment and decrement operators (`++` and `--`)

  自增或自减操作符 (`++`和`--`)


Other notable differences from JavaScript syntax include:

和 JavaScript语 法的其它显著不同包括：

* no support for the bitwise operators `|` and `&`

  不支持位运算`|`和`&`
  
* new [template expression operators](guide/template-syntax#expression-operators), such as `|`, `?.` and `!`.

  具有新的[模板表达式运算符](guide/template-syntax#expression-operators)，比如`|`、`?.`和`!`。


{@a expression-context}

### Expression context

### 表达式上下文

The *expression context* is typically the _component_ instance.
In the following snippets, the `title`  within double-curly braces and the
`isUnchanged` in quotes refer to properties of the `AppComponent`.

典型的*表达式上下文*就是这个**组件实例**，它是各种绑定值的来源。
在下面的代码片段中，双花括号中的`title`和引号中的`isUnchanged`所引用的都是`AppComponent`中的属性。


<code-example path="template-syntax/src/app/app.component.html" region="context-component-expression" title="src/app/app.component.html" linenums="false">
</code-example>

An expression may also refer to properties of the _template's_ context
such as a [template input variable](guide/template-syntax#template-input-variable) (`let hero`)
or a [template reference variable](guide/template-syntax#ref-vars) (`#heroInput`).

表达式的上下文可以包括组件之外的对象。
  比如[模板输入变量](guide/template-syntax#template-input-variable) (`let hero`)和[模板引用变量](guide/template-syntax#ref-vars)(`#heroInput`)就是备选的上下文对象之一。


<code-example path="template-syntax/src/app/app.component.html" region="context-var" title="src/app/app.component.html" linenums="false">
</code-example>

The context for terms in an expression is a blend of the _template variables_,
the directive's _context_ object (if it has one), and the component's _members_.
If you reference a name that belongs to more than one of these namespaces,
the template variable name takes precedence, followed by a name in the directive's _context_,
and, lastly, the component's member names.

表达式中的上下文变量是由*模板变量*、指令的*上下文变量*（如果有）和组件的*成员*叠加而成的。
如果我们要引用的变量名存在于一个以上的命名空间中，那么，模板变量是最优先的，其次是指令的上下文变量，最后是组件的成员。

The previous example presents such a name collision. The component has a `hero`
property and the `*ngFor` defines a `hero` template variable.
The `hero` in `{{hero.name}}`
refers to the template input variable, not the component's property.

上一个例子中就体现了这种命名冲突。组件具有一个名叫`hero`的属性，而`*ngFor`声明了一个也叫`hero`的模板变量。
在`{{hero.name}}`表达式中的`hero`实际引用的是模板变量，而不是组件的属性。

Template expressions cannot refer to anything in
the global namespace. They can't refer to `window` or `document`. They
can't call `console.log` or `Math.max`. They are restricted to referencing
members of the expression context.

模板表达式不能引用全局命名空间中的任何东西，比如`window`或`document`。它们也不能调用`console.log`或`Math.max`。
它们只能引用表达式上下文中的成员。

<a href="#top-of-page">back to top</a>

<a href="#top-of-page">回到顶部</a>

{@a no-side-effects}

{@a expression-guidelines}

### Expression guidelines

### 表达式指南

Template expressions can make or break an application.
Please follow these guidelines:

模板表达式能成就或毁掉一个应用。请遵循下列指南：

* [No visible side effects](guide/template-syntax#no-visible-side-effects)

  [没有可见的副作用](guide/template-syntax#no-visible-side-effects)

* [Quick execution](guide/template-syntax#quick-execution)

  [执行迅速](guide/template-syntax#quick-execution)

* [Simplicity](guide/template-syntax#simplicity)

  [非常简单](guide/template-syntax#simplicity)

* [Idempotence](guide/template-syntax#idempotence)

  [幂等性](guide/template-syntax#idempotence)

The only exceptions to these guidelines should be in specific circumstances that you thoroughly understand.

超出上面指南外的情况应该只出现在那些你确信自己已经彻底理解的特定场景中。

#### No visible side effects

#### 没有可见的副作用

A template expression should not change any application state other than the value of the
target property.

模板表达式除了目标属性的值以外，不应该改变应用的任何状态。

This rule is essential to Angular's "unidirectional data flow" policy.
You should never worry that reading a component value might change some other displayed value.
The view should be stable throughout a single rendering pass.

这条规则是 Angular “单向数据流”策略的基础。
永远不用担心读取组件值可能改变另外的显示值。
在一次单独的渲染过程中，视图应该总是稳定的。

#### Quick execution

#### 执行迅速  

Angular executes template expressions  after every change detection cycle.
Change detection cycles are triggered by many asynchronous activities such as
promise resolutions, http results, timer events, keypresses and mouse moves.
Expressions should finish quickly or the user experience may drag, especially on slower devices.
Consider caching values when their computation is expensive.

Angular 执行模板表达式比我们想象的频繁。
它们可能在每一次按键或鼠标移动后被调用。
表达式应该快速结束，否则用户就会感到拖沓，特别是在较慢的设备上。
当计算代价较高时，应该考虑缓存那些从其它值计算得出的值。

#### Simplicity

#### 非常简单  

Although it's possible to write quite complex template expressions, you should avoid them.

虽然也可以写出相当复杂的模板表达式，但不要那么写。

A property name or method call should be the norm.
An occasional Boolean negation (`!`) is OK.
Otherwise, confine application and business logic to the component itself,
where it will be easier to develop and test.

常规是属性名或方法调用。偶尔的逻辑取反 (`!`) 也还凑合。
其它情况下，应在组件中实现应用和业务逻辑，使开发和测试变得更容易。

#### Idempotence

#### 幂等性

An [idempotent](https://en.wikipedia.org/wiki/Idempotence) expression is ideal because
it is free of side effects and improves Angular's change detection performance.

最好使用[幂等的](https://en.wikipedia.org/wiki/Idempotence)表达式，因为它没有副作用，并且能提升 Angular 变更检测的性能。

In Angular terms, an idempotent expression always returns *exactly the same thing* until
one of its dependent values changes.

在 Angular 的术语中，幂等的表达式应该总是返回*完全相同的东西*，直到某个依赖值发生改变。

Dependent values should not change during a single turn of the event loop.
If an idempotent expression returns a string or a number, it returns the same string or number
when called twice in a row. If the expression returns an object (including an `array`),
it returns the same object *reference* when called twice in a row.

在单独的一次事件循环中，被依赖的值不应该改变。
  如果幂等的表达式返回一个字符串或数字，连续调用它两次，也应该返回相同的字符串或数字。
  如果幂等的表达式返回一个对象（包括`Date`或`Array`），连续调用它两次，也应该返回同一个对象的*引用*。

<a href="#top-of-page">back to top</a>

<a href="#top-of-page">回到顶部</a>

<hr/>

{@a template-statements}

## Template statements

## 模板语句

A template **statement** responds to an **event** raised by a binding target
such as an element, component, or directive.
You'll see template statements in the [event binding](guide/template-syntax#event-binding) section,
appearing in quotes to the right of the `=`&nbsp;symbol as in `(event)="statement"`.

模板**语句**用来响应由绑定目标（如 HTML 元素、组件或指令）触发的**事件**。
模板语句将在[事件绑定](guide/template-syntax#event-binding)一节看到，它出现在`=`号右侧的引号中，就像这样：`(event)="statement"`。


<code-example path="template-syntax/src/app/app.component.html" region="context-component-statement" title="src/app/app.component.html" linenums="false">
</code-example>

A template statement *has a side effect*.
That's the whole point of an event.
It's how you update application state from user action.

模板语句*有副作用*。
这是事件处理的关键。因为我们要根据用户的输入更新应用状态。

Responding to events is the other side of Angular's "unidirectional data flow".
You're free to change anything, anywhere, during this turn of the event loop.

响应事件是 Angular 中“单向数据流”的另一面。
    在一次事件循环中，可以随意改变任何地方的任何东西。

Like template expressions, template *statements* use a language that looks like JavaScript.
The template statement parser differs from the template expression parser and
specifically supports both basic assignment (`=`) and chaining expressions
(with <code>;</code> or <code>,</code>).

和模板表达式一样，模板*语句*使用的语言也像 JavaScript。
  模板语句解析器和模板表达式解析器有所不同，特别之处在于它支持基本赋值 (`=`) 和表达式链 (`;`和`,`)。

However, certain JavaScript syntax is not allowed:

然而，某些 JavaScript 语法仍然是不允许的：

* <code>new</code>

  `new`运算符
  
* increment and decrement operators, `++` and `--`

  自增和自减运算符：`++`和`--`

* operator assignment, such as `+=` and `-=`

  操作并赋值，例如`+=`和`-=`

* the bitwise operators `|` and `&`

  位操作符`|`和`&`

* the [template expression operators](guide/template-syntax#expression-operators)

  [模板表达式运算符](guide/template-syntax#expression-operators)

### Statement context

### 语句上下文

As with expressions, statements can refer only to what's in the statement context
such as an event handling method of the component instance.

和表达式中一样，语句只能引用语句上下文中 —— 通常是正在绑定事件的那个**组件实例**。

The *statement context* is typically the component instance.
The *deleteHero* in `(click)="deleteHero()"` is a method of the data-bound component.

典型的*语句上下文*就是当前组件的实例。
`(click)="deleteHero()"`中的*deleteHero*就是这个数据绑定组件上的一个方法。


<code-example path="template-syntax/src/app/app.component.html" region="context-component-statement" title="src/app/app.component.html" linenums="false">
</code-example>

The statement context may also refer to properties of the template's own context.
In the following examples, the template `$event` object,
a [template input variable](guide/template-syntax#template-input-variable) (`let hero`),
and a [template reference variable](guide/template-syntax#ref-vars) (`#heroForm`)
are passed to an event handling method of the component.

语句上下文可以引用模板自身上下文中的属性。
在下面的例子中，就把模板的`$event`对象、[模板输入变量](guide/template-syntax#template-input-variable) (`let hero`)和[模板引用变量](guide/template-syntax#ref-vars) (`#heroForm`)传给了组件中的一个事件处理器方法。


<code-example path="template-syntax/src/app/app.component.html" region="context-var-statement" title="src/app/app.component.html" linenums="false">
</code-example>

Template context names take precedence over component context names.
In `deleteHero(hero)` above, the `hero` is the template input variable,
not the component's `hero` property.

模板上下文中的变量名的优先级高于组件上下文中的变量名。在上面的`deleteHero(hero)`中，`hero`是一个模板输入变量，而不是组件中的`hero`属性。

Template statements cannot refer to anything in the global namespace. They
can't refer to `window` or `document`.
They can't call `console.log` or `Math.max`.

模板语句不能引用全局命名空间的任何东西。比如不能引用`window` 或 `document`，也不能调用`console.log`或`Math.max`。

### Statement guidelines

### 语句指南

As with expressions, avoid writing complex template statements.
A method call or simple property assignment should be the norm.

和表达式一样，避免写复杂的模板语句。
常规是函数调用或者属性赋值。

Now that you have a feel for template expressions and statements,
you're ready to learn about the varieties of data binding syntax beyond interpolation.


现在，对模板表达式和语句有了一点感觉了吧。
  除插值表达式外，还有各种各样的数据绑定语法，是学习它们是时候了。
  
<a href="#top-of-page">back to top</a>

<a href="#top-of-page">回到顶部</a>

<hr/>

{@a binding-syntax}

## Binding syntax: An overview

## 绑定语法：概览

Data binding is a mechanism for coordinating what users see, with application data values.
  While you could push values to and pull values from HTML,
  the application is easier to write, read, and maintain if you turn these chores over to a binding framework.
  You simply declare bindings between binding sources and target HTML elements and let the framework do the work.

数据绑定是一种机制，用来协调用户所见和应用数据。
  虽然我们能往 HTML 推送值或者从 HTML 拉取值，
  但如果把这些琐事交给数据绑定框架处理，
  应用会更容易编写、阅读和维护。
  只要简单地在绑定源和目标 HTML 元素之间声明绑定，框架就会完成这项工作。

Angular provides many kinds of data binding.
This guide covers most of them, after a high-level view of Angular data binding and its syntax.

Angular 提供了各种各样的数据绑定，本章将逐一讨论。
不过我们要先从高层视角来看看 Angular 数据绑定及其语法。
  
Binding types can be grouped into three categories distinguished by the direction of data flow:
from the _source-to-view_, from _view-to-source_, and in the two-way sequence: _view-to-source-to-view_:


绑定的类型可以根据数据流的方向分成三类：
*从数据源到视图*、*从视图到数据源*以及双向的*从视图到数据源再到视图*。
  



<table >
  <tr>
    <th>

      <p>
        Data direction
      </p>

      <p>
        数据方向
      </p>

    </th>
    <th>

      <p>
        Syntax
      </p>

      <p>
        语法
      </p>

    </th>
    <th>

      <p>
        Type
      </p>

      <p>
        绑定类型
      </p>

    </th>

  </tr>
  <tr>
    <td>

      <p>
        One-way
      </p>

      <p>
        单向
      </p>

      <p>
        from data source
      </p>

      <p>
        从数据源
      </p>

      <p>
        to view target
      </p>

      <p>
        到视图目标
      </p>

    </td>
    <td>

      <code-example>
        {{expression}}
        [target]="expression"
        bind-target="expression"
      </code-example>

    </td>
    <td>

      <p>
        Interpolation
      </p>

      <p>
        插值表达式
      </p>

      <p>
        Property
      </p>

      <p>
        Attribute
      </p>

      <p>
        Class
      </p>

      <p>
        类
      </p>

      <p>
        Style
      </p>

      <p>
        样式
      </p>

    </td>

  </tr>  <tr>

      <td>
<p>        One-way</p>

      <p>
        单向
      </p>

      <p>from view target</p>

      <p>
        从视图目标
      </p>

      <p>to data source
      </p>

      <p>
        到数据源
      </p>

    </td>

      <td>

        <code-example>
          (target)="statement"
          on-target="statement"
        </code-example>

      </td>

      <td><p>
        Event
      </p>

      <p>
        事件
      </p>

    </td>

    </tr>

    <tr>

      <td><p>
        Two-way
      </p>

      <p>
        双向
      </p>

    </td>

      <td>

        <code-example>
          [(target)]="expression"
          bindon-target="expression"
        </code-example>

      </td>

      <td><p>
        Two-way
      </p>

    <p>
        双向
      </p>

    </td>

  </tr>
</table>



<div class="alert is-important">



译注：由于 HTML attribute 和 DOM property 在中文中都被翻译成了“属性”，无法区分，
而接下来的部分重点是对它们进行比较。

我们无法改变历史，因此，在本章的翻译中，保留了它们的英文形式，不加翻译，以免混淆。
本章中，如果提到“属性”的地方，一定是指 property，因为在 Angular 中，实际上很少涉及 attribute。

但在其它章节中，为简单起见，凡是能通过上下文明显区分开的，就仍统一译为“属性”，
区分不明显的，会加注英文。


</div>



Binding types other than interpolation have a **target name** to the left of the equal sign,
either surrounded by punctuation (`[]`, `()`) or preceded by a prefix (`bind-`, `on-`, `bindon-`).

除了插值表达式之外的绑定类型，在等号左边是**目标名**，
  无论是包在括号中 (`[]`、`()`) 还是用前缀形式 (`bind-`、`on-`、`bindon-`) 。

The target name is the name of a _property_. It may look like the name of an _attribute_ but it never is.
To appreciate the difference, you must develop a new way to think about template HTML.

这个目标名就是*属性（Property）*的名字。它可能看起来像是*元素属性（Attribute）*的名字，但它不是。
要理解它们的不同点，我们必须尝试用另一种方式来审视模板中的 HTML。

### A new mental model

### 新的思维模型

With all the power of data binding and the ability to extend the HTML vocabulary
with custom markup, it is tempting to think of template HTML as *HTML Plus*.

数据绑定的威力和允许用自定义标记扩展 HTML 词汇的能力，容易误导我们把模板 HTML 当成 *HTML+*。

It really *is* HTML Plus.
But it's also significantly different than the HTML you're used to.
It requires a new mental model.

它其实*就是* HTML+。
但它也跟我们熟悉的 HTML 有着显著的不同。
我们需要一种新的思维模型。

In the normal course of HTML development, you create a visual structure with HTML elements, and
you modify those elements by setting element attributes with string constants.

在正常的 HTML 开发过程中，我们使用 HTML 元素创建视觉结构，
通过把字符串常量设置到元素的 attribute 来修改那些元素。


<code-example path="template-syntax/src/app/app.component.html" region="img+button" title="src/app/app.component.html" linenums="false">
</code-example>

You still create a structure and initialize attribute values this way in Angular templates.

在 Angular 模板中，我们仍使用同样的方式来创建结构和初始化 attribute 值。

Then you learn to create new elements with components that encapsulate HTML
and drop them into  templates as if they were native HTML elements.

然后，用封装了 HTML 的组件创建新元素，并把它们当作原生 HTML 元素在模板中使用。


<code-example path="template-syntax/src/app/app.component.html" region="hero-detail-1" title="src/app/app.component.html" linenums="false">
</code-example>

That's HTML Plus.

这就是HTML+。

Then you learn about data binding. The first binding you meet might look like this:

现在开始学习数据绑定。我们碰到的第一种数据绑定是这样的：


<code-example path="template-syntax/src/app/app.component.html" region="disabled-button-1" title="src/app/app.component.html" linenums="false">
</code-example>

You'll get to that peculiar bracket notation in a moment. Looking beyond it,
your intuition suggests that you're binding to the button's `disabled` attribute and setting
it to the current value of the component's `isUnchanged` property.

过会儿再认识那个怪异的方括号记法。直觉告诉我们，我们正在绑定按钮的`disabled` attribute。
  并把它设置为组件的`isUnchanged`属性的当前值。

Your intuition is incorrect! Your everyday HTML mental model is misleading.
In fact, once you start data binding, you are no longer working with HTML *attributes*. You aren't setting attributes.
You are setting the *properties* of DOM elements, components, and directives.

但我们的直觉是错的！日常的 HTML 思维模式在误导我们。
实际上，一旦开始数据绑定，就不再跟 HTML attribute 打交道了。
这里不是设置 attribute，而是设置 DOM 元素、组件和指令的 property。


<div class="l-sub-section">

### HTML attribute vs. DOM property

### HTML attribute 与 DOM property 的对比

The distinction between an HTML attribute and a DOM property is crucial to understanding how Angular binding works.

要想理解 Angular 绑定如何工作，重点是搞清 HTML attribute 和 DOM property 之间的区别。

**Attributes are defined by HTML. Properties are defined by the DOM (Document Object Model).**

**attribute 是由 HTML 定义的。property 是由 DOM (Document Object Model) 定义的。**

* A few HTML attributes have 1:1 mapping to properties. `id` is one example.

  少量 HTML attribute 和 property 之间有着 1:1 的映射，如`id`。

* Some HTML attributes don't have corresponding properties. `colspan` is one example.

  有些 HTML attribute 没有对应的 property，如`colspan`。

* Some DOM properties don't have corresponding attributes. `textContent` is one example.

  有些 DOM property 没有对应的 attribute，如`textContent`。

* Many HTML attributes appear to map to properties ... but not in the way you might think!

  大量 HTML attribute看起来映射到了property…… 但却不像我们想的那样！

That last category is confusing until you grasp this general rule:

最后一类尤其让人困惑…… 除非我们能理解这个普遍原则：

**Attributes *initialize* DOM properties and then they are done.
Property values can change; attribute values can't.**

**attribute *初始化* DOM property，然后它们的任务就完成了。property 的值可以改变；attribute 的值不能改变。**

For example, when the browser renders `<input type="text" value="Bob">`, it creates a
corresponding DOM node with a `value` property *initialized* to "Bob".

例如，当浏览器渲染`<input type="text" value="Bob">`时，它将创建相应 DOM 节点，
其`value` property 被*初始化为* “Bob”。

When the user enters "Sally" into the input box, the DOM element `value` *property* becomes "Sally".
But the HTML `value` *attribute* remains unchanged as you discover if you ask the input element
about that attribute: `input.getAttribute('value')` returns "Bob".

当用户在输入框中输入 “Sally” 时，DOM 元素的`value` *property* 变成了 “Sally”。
但是这个 HTML `value` *attribute* 保持不变。如果我们读取 input 元素的 attribute，就会发现确实没变：
`input.getAttribute('value') // 返回 "Bob"`。

The HTML attribute `value` specifies the *initial* value; the DOM `value` property is the *current* value.

HTML attribute `value`指定了*初始*值；DOM `value` property 是*当前*值。

The `disabled` attribute is another peculiar example. A button's `disabled` *property* is
`false` by default so the button is enabled.
When you add the `disabled` *attribute*, its presence alone initializes the  button's `disabled` *property* to `true`
so the button is disabled.

`disabled` attribute 是另一个古怪的例子。按钮的`disabled` *property* 是`false`，因为默认情况下按钮是可用的。
当我们添加`disabled` *attribute* 时，只要它出现了按钮的`disabled` *property* 就初始化为`true`，于是按钮就被禁用了。

Adding and removing the `disabled` *attribute* disables and enables the button. The value of the *attribute* is irrelevant,
which is why you cannot enable a button by writing `<button disabled="false">Still Disabled</button>`.

添加或删除`disabled` *attribute*会禁用或启用这个按钮。但 *attribute* 的值无关紧要，这就是我们为什么没法通过
`<button disabled="false">仍被禁用</button>`这种写法来启用按钮。

Setting the button's `disabled` *property*  (say, with an Angular binding) disables or enables the button.
The value of the *property* matters.

设置按钮的`disabled` *property*（如，通过 Angular 绑定）可以禁用或启用这个按钮。
这就是 *property* 的价值。

**The HTML attribute and the DOM property are not the same thing, even when they have the same name.**

**就算名字相同，HTML attribute 和 DOM property 也不是同一样东西。**


</div>

This fact bears repeating:

这句话值得再强调一次：

**Template binding works with *properties* and *events*, not *attributes*.**

**模板绑定是通过 *property* 和*事件*来工作的，而不是 *attribute*。**


<div class="callout is-helpful">

<header>
  A world without attributes
</header>



<header>
  没有 attribute 的世界
</header>



In the world of Angular, the only role of attributes is to initialize element and directive state.
When you write a data binding, you're dealing exclusively with  properties and eventsof the target object.
HTML attributes effectively disappear.

在 Angular 的世界中，attribute 唯一的作用是用来初始化元素和指令的状态。
当进行数据绑定时，只是在与元素和指令的 property 和事件打交道，而 attribute 就完全靠边站了。


</div>

With this model firmly in mind, read on to learn about binding targets.

把这个思维模型牢牢的印在脑子里，接下来，学习什么是绑定目标。

### Binding targets

### 绑定目标

The **target of a data binding** is something in the DOM.
Depending on the binding type, the target can be an
(element | component | directive) property, an
(element | component | directive) event, or (rarely) an attribute name.
The following table summarizes:

**数据绑定的目标**是 DOM 中的某些东西。
这个目标可能是（元素 | 组件 | 指令的）property、（元素 | 组件 | 指令的）事件，或(极少数情况下) attribute 名。
下面是的汇总表：


<style>
  td, th {vertical-align: top}
</style>

<table width="100%">
  <col width="10%">
  </col>
  <col width="15%">
  </col>
  <col width="75%">
  </col>
  <tr>
    <th>

      <p>
        Type
      </p>

      <p>
        绑定类型
      </p>

    </th>
    <th>

      <p>
        Target
      </p>

      <p>
        目标
      </p>

    </th>
    <th>

      <p>
        Examples
      </p>

      <p>
        范例
      </p>

    </th>
  </tr>
  <tr>
    <td>

      <p>
        Property
      </p>

    </td>
    <td>

      <p>
        Element&nbsp;property
      </p>

      <p>
        元素的 property
      </p>

      <p>
        Component&nbsp;property
      </p>

      <p>
        组件的 property
      </p>

      <p>
        Directive&nbsp;property
      </p>

      <p>
        指令的 property
      </p>

    </td>
    <td>
      <code-example path="template-syntax/src/app/app.component.html" region="property-binding-syntax-1" title="src/app/app.component.html" linenums="false">
      </code-example>
    </td>
  </tr>
  <tr>
    <td>

      <p>
        Event
      </p>

      <p>
        事件
      </p>

    </td>
    <td>

      <p>
        Element&nbsp;event
      </p>

      <p>
        元素的事件
      </p>

      <p>
        Component&nbsp;event
      </p>

      <p>
        组件的事件
      </p>

      <p>
        Directive&nbsp;event
      </p>

      <p>
        指令的事件
      </p>

    </td>
    <td>
      <code-example path="template-syntax/src/app/app.component.html" region="event-binding-syntax-1" title="src/app/app.component.html" linenums="false">
      </code-example>
    </td>
  </tr>
  <tr>
    <td>

      <p>
        Two-way
      </p>

      <p>
        双向
      </p>

    </td>
    <td>

      <p>
        Event and property
      </p>

      <p>
        事件与 property
      </p>

    </td>
    <td>
      <code-example path="template-syntax/src/app/app.component.html" region="2-way-binding-syntax-1" title="src/app/app.component.html" linenums="false">
      </code-example>
    </td>
  </tr>
  <tr>
    <td>
      Attribute
    </td>
    <td>

      <p>
        Attribute (the&nbsp;exception)
      </p>

      <p>
        attribute（例外情况）
      </p>

    </td>
    <td>
      <code-example path="template-syntax/src/app/app.component.html" region="attribute-binding-syntax-1" title="src/app/app.component.html" linenums="false">
      </code-example>
    </td>
  </tr>
  <tr>
    <td>

      <p>
        Class
      </p>

      <p>
        CSS 类
      </p>

    </td>
    <td>

      <p>
        <code>class</code> property
      </p>

    </td>
    <td>
      <code-example path="template-syntax/src/app/app.component.html" region="class-binding-syntax-1" title="src/app/app.component.html" linenums="false">
      </code-example>
    </td>
  </tr>
  <tr>
    <td>

      <p>
        Style
      </p>

      <p>
        样式
      </p>

    </td>
    <td>

      <p>
        <code>style</code> property
      </p>

    </td>
    <td>
      <code-example path="template-syntax/src/app/app.component.html" region="style-binding-syntax-1" title="src/app/app.component.html" linenums="false">
      </code-example>
    </td>
  </tr>
</table>

With this broad view in mind, you're ready to look at binding types in detail.

放开眼界，我们来看看每种绑定类型的具体情况。

<a href="#top-of-page">back to top</a>

<a href="#top-of-page">回到顶部</a>

<hr/>

{@a property-binding}

## Property binding ( <span class="syntax">[property]</span> )

## 属性绑定 ( <span class="syntax">[属性名]</span> )

Write a template **property binding** to set a property of a view element.
The binding sets the property to the value of a [template expression](guide/template-syntax#template-expressions).

当要把视图元素的属性 (property) 设置为[模板表达式](guide/template-syntax#template-expressions)时，就要写模板的**属性 (property) 绑定**。

The most common property binding sets an element property to a component property value. An example is
binding the `src` property of an image element to a component's `heroImageUrl` property:

最常用的属性绑定是把元素属性设置为组件属性的值。
下面这个例子中，image 元素的`src`属性会被绑定到组件的`heroImageUrl`属性上：


<code-example path="template-syntax/src/app/app.component.html" region="property-binding-1" title="src/app/app.component.html" linenums="false">
</code-example>

Another example is disabling a button when the component says that it `isUnchanged`:

另一个例子是当组件说它`isUnchanged`（未改变）时禁用按钮：


<code-example path="template-syntax/src/app/app.component.html" region="property-binding-2" title="src/app/app.component.html" linenums="false">
</code-example>

Another is setting a property of a directive:

另一个例子是设置指令的属性：


<code-example path="template-syntax/src/app/app.component.html" region="property-binding-3" title="src/app/app.component.html" linenums="false">
</code-example>

Yet another is setting the model property of a custom component (a great way
for parent and child components to communicate):

还有另一个例子是设置自定义组件的模型属性（这是父子组件之间通讯的重要途径）：


<code-example path="template-syntax/src/app/app.component.html" region="property-binding-4" title="src/app/app.component.html" linenums="false">
</code-example>

### One-way *in*

### 单向*输入*


People often describe property binding as *one-way data binding* because it flows a value in one direction,
from a component's data property into a target element property.

人们经常把属性绑定描述成*单向数据绑定*，因为值的流动是单向的，从组件的数据属性流动到目标元素的属性。

You cannot use property binding to pull values *out* of the target element.
You can't bind to a property of the target element to _read_ it. You can only _set_ it.

不能使用属性绑定来从目标元素拉取值，也不能绑定到目标元素的属性来读取它。只能设置它。


<div class="l-sub-section">

Similarly, you cannot use property binding to *call* a method on the target element.

也不能使用属性 绑定 来*调用*目标元素上的方法。

If the element raises events, you can listen to them with an [event binding](guide/template-syntax#event-binding).

如果这个元素触发了事件，可以通过[事件绑定](guide/template-syntax#event-binding)来监听它们。

If you must read a target element property or call one of its methods,
you'll need a different technique.
See the API reference for
[ViewChild](api/core/ViewChild) and
[ContentChild](api/core/ContentChild).

如果必须读取目标元素上的属性或调用它的某个方法，得用另一种技术。
参见 API 参考手册中的
[ViewChild](api/core/ViewChild) 和
[ContentChild](api/core/ContentChild)。


</div>

### Binding target

### 绑定目标  

An element property between enclosing square brackets identifies the target property. The target property in the following code is the image element's `src` property.

包裹在方括号中的元素属性名标记着目标属性。下列代码中的目标属性是 image 元素的`src`属性。

<code-example path="template-syntax/src/app/app.component.html" region="property-binding-1" title="src/app/app.component.html" linenums="false">
</code-example>

Some people prefer the `bind-` prefix alternative, known as the *canonical form*:

有些人喜欢用`bind-`前缀的可选形式，并称之为*规范形式*：


<code-example path="template-syntax/src/app/app.component.html" region="property-binding-5" title="src/app/app.component.html" linenums="false">
</code-example>

The target name is always the name of a property, even when it appears to be the name of something else.
You see `src` and may think it's the name of an attribute. No. It's the name of an image element property.

目标的名字总是 property 的名字。即使它看起来和别的名字一样。
看到`src`时，可能会把它当做 attribute。不！它不是！它是 image 元素的 property 名。

Element properties may be the more common targets,
but Angular looks first to see if the name is a property of a known directive,
as it is in the following example:

元素属性可能是最常见的绑定目标，但 Angular 会先去看这个名字是否是某个已知指令的属性名，就像下面的例子中一样：


<code-example path="template-syntax/src/app/app.component.html" region="property-binding-3" title="src/app/app.component.html" linenums="false">
</code-example>

<div class="l-sub-section">

Technically, Angular is matching the name to a directive [input](guide/template-syntax#inputs-outputs),
one of the property names listed in the directive's `inputs` array or a property decorated with `@Input()`.
Such inputs map to the directive's own properties.

严格来说，Angular 正在匹配指令的[输入属性](guide/template-syntax#inputs-outputs)的名字。
这个名字是指令的`inputs`数组中所列的名字，或者是带有`@Input()`装饰器的属性。
这些输入属性被映射为指令自己的属性。


</div>

If the name fails to match a property of a known directive or element, Angular reports an “unknown directive” error.

如果名字没有匹配上已知指令或元素的属性，Angular 就会报告“未知指令”的错误。

### Avoid side effects

### 消除副作用

As mentioned previously, evaluation of a template expression should have no visible side effects.
The expression language itself does its part to keep you safe.
You can't assign a value to anything in a property binding expression nor use the increment and decrement operators.

正如以前讨论过的，模板表达式的计算不能有可见的副作用。表达式语言本身可以提供一部分安全保障。
  不能在属性绑定表达式中对任何东西赋值，也不能使用自增、自减运算符。

Of course, the expression might invoke a property or method that has side effects.
  Angular has no way of knowing that or stopping you.

当然，表达式可能会调用具有副作用的属性或方法。但 Angular 没法知道这一点，也没法阻止我们。

The expression could call something like `getFoo()`. Only you know what `getFoo()` does.
If `getFoo()` changes something and you happen to be binding to that something, you risk an unpleasant experience.
Angular may or may not display the changed value. Angular may detect the change and throw a warning error.
In general, stick to data properties and to methods that return values and do no more.

表达式中可以调用像`getFoo()`这样的方法。只有我们知道`getFoo()`干了什么。
如果`getFoo()`改变了某个东西，恰好又绑定到个这个东西，我们就可能把自己坑了。
Angular 可能显示也可能不显示变化后的值。Angular 还可能检测到变化，并抛出警告型错误。
一般建议是，只绑定数据属性和那些只返回值而不做其它事情的方法。

### Return the proper type

### 返回恰当的类型

The template expression should evaluate to the type of value expected by the target property.
Return a string if the target property expects a string.
Return a number if the target property expects a number.
Return an object if the target property expects an object.

模板表达式应该返回目标属性所需类型的值。
如果目标属性想要个字符串，就返回字符串。
如果目标属性想要个数字，就返回数字。
如果目标属性想要个对象，就返回对象。

The `hero` property of the `HeroDetail` component expects a `Hero` object, which is exactly what you're sending in the property binding:

`HeroDetail`组件的`hero`属性想要一个`Hero`对象，那就在属性绑定中精确地给它一个`Hero`对象：


<code-example path="template-syntax/src/app/app.component.html" region="property-binding-4" title="src/app/app.component.html" linenums="false">
</code-example>

### Remember the brackets

### 别忘了方括号

The brackets tell Angular to evaluate the template expression.
If you omit the brackets, Angular treats the string as a constant
and *initializes the target property* with that string.
It does *not* evaluate the string!

方括号告诉 Angular 要计算模板表达式。
如果忘了加方括号，Angular 会把这个表达式当做字符串常量看待，并用该字符串来*初始化目标属性*。
它*不会*计算这个字符串。

Don't make the following mistake:

不要出现这样的失误：


<code-example path="template-syntax/src/app/app.component.html" region="property-binding-6" title="src/app/app.component.html" linenums="false">
</code-example>

{@a one-time-initialization}

### One-time string initialization

### 一次性字符串初始化

You *should* omit the brackets when all of the following are true:

当满足下列条件时，*应该*省略括号：

* The target property accepts a string value.

  目标属性接受字符串值。

* The string is a fixed value that you can bake into the template.

  字符串是个固定值，可以直接合并到模块中。
  
* This initial value never changes.

  这个初始值永不改变。

You routinely initialize attributes this way in standard HTML, and it works
just as well for directive and component property initialization.
The following example initializes the `prefix` property of the `HeroDetailComponent` to a fixed string,
not a template expression. Angular sets it and forgets about it.

我们经常这样在标准 HTML 中用这种方式初始化 attribute，这种方式也可以用在初始化指令和组件的属性。
下面这个例子把`HeroDetailComponent`的`prefix`属性初始化为固定的字符串，而不是模板表达式。Angular 设置它，然后忘记它。


<code-example path="template-syntax/src/app/app.component.html" region="property-binding-7" title="src/app/app.component.html" linenums="false">
</code-example>

The `[hero]` binding, on the other hand, remains a live binding to the component's `currentHero` property.

作为对比，`[hero]`绑定是组件的`currentHero`属性的活绑定，它会一直随着更新。

{@a property-binding-or-interpolation}

### Property binding or interpolation?

### 属性绑定还是插值表达式？

You often have a choice between interpolation and property binding.
The following binding pairs do the same thing:

我们通常得在插值表达式和属性绑定之间做出选择。
下列这几对绑定做的事情完全相同：


<code-example path="template-syntax/src/app/app.component.html" region="property-binding-vs-interpolation" title="src/app/app.component.html" linenums="false">
</code-example>

_Interpolation_ is a convenient alternative to _property binding_ in many cases.

在多数情况下，插值表达式是更方便的备选项。
实际上，在渲染视图之前，Angular 把这些插值表达式翻译成相应的属性绑定。

When rendering data values as strings, there  is no technical reason to prefer one form to the other.
You lean toward readability, which tends to favor interpolation.
You suggest establishing coding style rules and choosing the form that
both conforms to the rules and feels most natural for the task at hand.

当要渲染的数据类型是字符串时，没有技术上的理由证明哪种形式更好。
我们倾向于可读性，所以倾向于插值表达式。
建议建立代码风格规则，选择一种形式，
这样，既遵循了规则，又能让手头的任务做起来更自然。

When setting an element property to a non-string data value, you must use _property binding_.

但数据类型不是字符串时，就必须使用*属性绑定*了。


#### Content security

#### 内容安全

Imagine the following *malicious content*.

假设下面的*恶意内容*


<code-example path="template-syntax/src/app/app.component.ts" region="evil-title" title="src/app/app.component.ts" linenums="false">
</code-example>

Fortunately, Angular data binding is on alert for dangerous HTML.
It [*sanitizes*](guide/security#sanitization-and-security-contexts) the values before displaying them.
It **will not** allow HTML with script tags to leak into the browser, neither with interpolation
nor property binding.

幸运的是，Angular 数据绑定对危险 HTML 有防备。
在显示它们之前，它对内容先进行*消毒*。
不管是插值表达式还是属性绑定，都**不会**允许带有 script 标签的 HTML 泄漏到浏览器中。


<code-example path="template-syntax/src/app/app.component.html" region="property-binding-vs-interpolation-sanitization" title="src/app/app.component.html" linenums="false">
</code-example>

Interpolation handles the script tags differently than property binding but both approaches render the
content harmlessly.

插值表达式处理 script 标签与属性绑定有所不同，但是二者都只渲染没有危害的内容。


<figure>
  <img src='generated/images/guide/template-syntax/evil-title.png' alt="evil title made safe">
</figure>

<a href="#top-of-page">back to top</a>

<a href="#top-of-page">回到顶部</a>

<hr/>

{@a other-bindings}

## Attribute, class, and style bindings

## attribute、class 和 style 绑定

The template syntax provides specialized one-way bindings for scenarios less well suited to property binding.

模板语法为那些不太适合使用属性绑定的场景提供了专门的单向数据绑定形式。

### Attribute binding

### attribute 绑定

You can set the value of an attribute directly with an **attribute binding**.

可以通过**attribute 绑定**来直接设置 attribute 的值。


<div class="l-sub-section">

This is the only exception to the rule that a binding sets a target property.
This is the only binding that creates and sets an attribute.

这是“绑定到目标属性 (property)”这条规则中唯一的例外。这是唯一的能创建和设置 attribute 的绑定形式。


</div>

This guide stresses repeatedly that setting an element property with a property binding
is always preferred to setting the attribute with a string. Why does Angular offer attribute binding?

本章中，通篇都在说通过属性绑定来设置元素的属性总是好于用字符串设置 attribute。为什么 Angular 还提供了 attribute 绑定呢？

**You must use attribute binding when there is no element property to bind.**

**因为当元素没有属性可绑的时候，就必须使用 attribute 绑定。**

Consider the [ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA),
[SVG](https://developer.mozilla.org/en-US/docs/Web/SVG), and
table span attributes. They are pure attributes.
They do not correspond to element properties, and they do not set element properties.
There are no property targets to bind to.

考虑 [ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA)，
  [SVG](https://developer.mozilla.org/en-US/docs/Web/SVG) 和 table 中的 colspan/rowspan 等 attribute。
  它们是纯粹的 attribute，没有对应的属性可供绑定。

This fact becomes painfully obvious when you write something like this.

如果想写出类似下面这样的东西，现状会令我们痛苦：


<code-example language="html">
  &lt;tr&gt;&lt;td colspan="{{1 + 1}}"&gt;Three-Four&lt;/td&gt;&lt;/tr&gt;
</code-example>

And you get this error:

会得到这个错误：


<code-example format="nocode">
  Template parse errors:
  Can't bind to 'colspan' since it isn't a known native property
  （模板解析错误：不能绑定到 'colspan'，因为它不是已知的原生属性）

</code-example>

As the message says, the `<td>` element does not have a `colspan` property.
It has the "colspan" *attribute*, but
interpolation and property binding can set only *properties*, not attributes.

正如提示中所说，`<td>`元素没有`colspan`属性。
  但是插值表达式和属性绑定只能设置*属性*，不能设置 attribute。

You need attribute bindings to create and bind to such attributes.

我们需要 attribute 绑定来创建和绑定到这样的 attribute。

Attribute binding syntax resembles property binding.
Instead of an element property between brackets, start with the prefix **`attr`**,
followed by a dot (`.`) and the name of the attribute.
You then set the attribute value, using an expression that resolves to a string.

attribute 绑定的语法与属性绑定类似。
  但方括号中的部分不是元素的属性名，而是由**`attr`**前缀，一个点 (`.`) 和 attribute 的名字组成。
  可以通过值为字符串的表达式来设置 attribute 的值。

Bind `[attr.colspan]` to a calculated value:

这里把`[attr.colspan]`绑定到一个计算值：


<code-example path="template-syntax/src/app/app.component.html" region="attrib-binding-colspan" title="src/app/app.component.html" linenums="false">
</code-example>

Here's how the table renders:

这里是表格渲染出来的样子：

<table border="1px">
  <tr><td colspan="2">One-Two</td></tr>
  <tr><td>Five</td><td>Six</td></tr>
 </table>

One of the primary use cases for attribute binding
is to set ARIA attributes, as in this example:

attribute 绑定的主要用例之一是设置 ARIA attribute（译注：ARIA指可访问性，用于给残障人士访问互联网提供便利），
就像这个例子中一样：


<code-example path="template-syntax/src/app/app.component.html" region="attrib-binding-aria" title="src/app/app.component.html" linenums="false">
</code-example>


<a href="#top-of-page">back to top</a>

<a href="#top-of-page">回到顶部</a>

<hr/>

### Class binding

### CSS 类绑定

You can add and remove CSS class names from an element's `class` attribute with
a **class binding**.

借助 **CSS 类绑定**，可以从元素的`class` attribute 上添加和移除 CSS 类名。

Class binding syntax resembles property binding.
Instead of an element property between brackets, start with the prefix `class`,
optionally followed by a dot (`.`) and the name of a CSS class: `[class.class-name]`.

CSS 类绑定绑定的语法与属性绑定类似。
但方括号中的部分不是元素的属性名，而是由**`class`**前缀，一个点 (`.`)和 CSS 类的名字组成，
其中后两部分是可选的。形如：`[class.class-name]`。

The following examples show how to add and remove the application's "special" class
with class bindings.  Here's how to set the attribute without binding:

下列例子示范了如何通过 CSS 类绑定来添加和移除应用的 "special" 类。不用绑定直接设置 attribute 时是这样的：


<code-example path="template-syntax/src/app/app.component.html" region="class-binding-1" title="src/app/app.component.html" linenums="false">
</code-example>

You can replace that with a binding to a string of the desired class names; this is an all-or-nothing, replacement binding.

可以把它改写为绑定到所需 CSS 类名的绑定；这是一个或者全有或者全无的替换型绑定。
（译注：即当 badCurly 有值时 class 这个 attribute 设置的内容会被完全覆盖）


<code-example path="template-syntax/src/app/app.component.html" region="class-binding-2" title="src/app/app.component.html" linenums="false">
</code-example>

Finally, you can bind to a specific class name.
Angular adds the class when the template expression evaluates to truthy.
It removes the class when the expression is falsy.

最后，可以绑定到特定的类名。
  当模板表达式的求值结果是真值时，Angular 会添加这个类，反之则移除它。


<code-example path="template-syntax/src/app/app.component.html" region="class-binding-3" title="src/app/app.component.html" linenums="false">
</code-example>

<div class="l-sub-section">

While this is a fine way to toggle a single class name,
the [NgClass directive](guide/template-syntax#ngClass) is usually preferred when managing multiple class names at the same time.

虽然这是切换单一类名的好办法，但我们通常更喜欢使用 [NgClass指令](guide/template-syntax#ngClass) 来同时管理多个类名。


</div>


<a href="#top-of-page">back to top</a>

<a href="#top-of-page">回到顶部</a>

<hr/>

### Style binding

### 样式绑定

You can set inline styles with a **style binding**.

通过**样式绑定**，可以设置内联样式。

Style binding syntax resembles property binding.
Instead of an element property between brackets, start with the prefix `style`,
followed by a dot (`.`) and the name of a CSS style property: `[style.style-property]`.

样式绑定的语法与属性绑定类似。
但方括号中的部分不是元素的属性名，而由**`style`**前缀，一个点 (`.`)和 CSS 样式的属性名组成。
形如：`[style.style-property]`。


<code-example path="template-syntax/src/app/app.component.html" region="style-binding-1" title="src/app/app.component.html" linenums="false">
</code-example>

Some style binding styles have a unit extension. The following example conditionally sets the font size in  “em” and “%” units.

有些样式绑定中的样式带有单位。在这里，以根据条件用 “em” 和 “%” 来设置字体大小的单位。

<code-example path="template-syntax/src/app/app.component.html" region="style-binding-2" title="src/app/app.component.html" linenums="false">
</code-example>

<div class="l-sub-section">

While this is a fine way to set a single style,
the [NgStyle directive](guide/template-syntax#ngStyle) is generally preferred when setting several inline styles at the same time.

虽然这是设置单一样式的好办法，但我们通常更喜欢使用 [NgStyle指令](guide/template-syntax#ngStyle) 来同时设置多个内联样式。


</div>

<div class="l-sub-section">

Note that a _style property_ name can be written in either
[dash-case](guide/glossary#dash-case), as shown above, or
[camelCase](guide/glossary#camelcase), such as `fontSize`.

注意，_样式属性_命名方法可以用[中线命名法](guide/glossary#dash-case)，像上面的一样
    也可以用[驼峰式命名法](guide/glossary#camelcase)，如`fontSize`。


</div>


<a href="#top-of-page">back to top</a>

<a href="#top-of-page">回到顶部</a>

<hr/>

{@a event-binding}

## Event binding  ( <span class="syntax">(event)</span> )
## 事件绑定  ( <span class="syntax">(事件名)</span> )

The bindings directives you've met so far flow data in one direction: **from a component to an element**.

前面遇到的绑定的数据流都是单向的：**从组件到元素**。

Users don't just stare at the screen. They enter text into input boxes. They pick items from lists.
They click buttons. Such user actions may result in a flow of data in the opposite direction:
**from an element to a component**.

但用户不会只盯着屏幕看。他们会在输入框中输入文本。他们会从列表中选取条目。
他们会点击按钮。这类用户动作可能导致反向的数据流：*从元素到组件*。

The only way to know about a user action is to listen for certain events such as
keystrokes, mouse movements, clicks, and touches.
You declare your interest in user actions through Angular event binding.

知道用户动作的唯一方式是监听某些事件，如按键、鼠标移动、点击和触摸屏幕。
可以通过 Angular 事件绑定来声明对哪些用户动作感兴趣。

Event binding syntax consists of a **target event** name
within parentheses on the left of an equal sign, and a quoted
[template statement](guide/template-syntax#template-statements) on the right.
The following event binding listens for the button's click events, calling
the component's `onSave()` method whenever a click occurs:

事件绑定语法由等号左侧带圆括号的**目标事件**和右侧引号中的[模板语句](guide/template-syntax#template-statements)组成。
下面事件绑定监听按钮的点击事件。每当点击发生时，都会调用组件的`onSave()`方法。


<code-example path="template-syntax/src/app/app.component.html" region="event-binding-1" title="src/app/app.component.html" linenums="false">
</code-example>

### Target event

### 目标事件

A **name between parentheses** &mdash; for example, `(click)` &mdash;
identifies the target event. In the following example, the target is the button's click event.

**圆括号中的名称** —— 比如`(click)` —— 标记出目标事件。在下面例子中，目标是按钮的 click 事件。


<code-example path="template-syntax/src/app/app.component.html" region="event-binding-1" title="src/app/app.component.html" linenums="false">
</code-example>

Some people prefer the `on-` prefix alternative, known as the **canonical form**:

有些人更喜欢带`on-`前缀的备选形式，称之为**规范形式**：


<code-example path="template-syntax/src/app/app.component.html" region="event-binding-2" title="src/app/app.component.html" linenums="false">
</code-example>

Element events may be the more common targets, but Angular looks first to see if the name matches an event property
of a known directive, as it does in the following example:

元素事件可能是更常见的目标，但 Angular 会先看这个名字是否能匹配上已知指令的事件属性，就像下面这个例子：


<code-example path="template-syntax/src/app/app.component.html" region="event-binding-3" title="src/app/app.component.html" linenums="false">
</code-example>

<div class="l-sub-section">

The `myClick` directive is further described in the section
on [aliasing input/output properties](guide/template-syntax#aliasing-io).

更多关于该`myClick`指令的解释，见[给输入/输出属性起别名](guide/template-syntax#aliasing-io)。

</div>

If the name fails to match an element event or an output property of a known directive,
Angular reports an “unknown directive” error.

如果这个名字没能匹配到元素事件或已知指令的输出属性，Angular 就会报“未知指令”错误。

### *$event* and event handling statements

### *$event* 和事件处理语句

In an event binding, Angular sets up an event handler for the target event.

在事件绑定中，Angular 会为目标事件设置事件处理器。

When the event is raised, the handler executes the template statement.
The template statement typically involves a receiver, which performs an action
in response to the event, such as storing a value from the HTML control
into a model.

当事件发生时，这个处理器会执行模板语句。
典型的模板语句通常涉及到响应事件执行动作的接收器，例如从 HTML 控件中取得值，并存入模型。

The binding conveys information about the event, including data values, through
an **event object named `$event`**.

绑定会通过**名叫`$event`的事件对象**传递关于此事件的信息（包括数据值）。

The shape of the event object is determined by the target event.
If the target event is a native DOM element event, then `$event` is a
[DOM event object](https://developer.mozilla.org/en-US/docs/Web/Events),
with properties such as `target` and `target.value`.

事件对象的形态取决于目标事件。如果目标事件是原生 DOM 元素事件，
`$event`就是 [DOM事件对象](https://developer.mozilla.org/en-US/docs/Web/Events)，它有像`target`和`target.value`这样的属性。

Consider this example:

考虑这个范例：


<code-example path="template-syntax/src/app/app.component.html" region="without-NgModel" title="src/app/app.component.html" linenums="false">
</code-example>

This code sets the input box `value` property by binding to the `name` property.
To listen for changes to the value, the code binds to the input box's `input` event.
When the user makes changes, the `input` event is raised, and the binding executes
the statement within a context that includes the DOM event object, `$event`.

上面的代码在把输入框的`value`属性绑定到`firstName`属性。
要监听对值的修改，代码绑定到输入框的`input`事件。
当用户造成更改时，`input`事件被触发，并在包含了 DOM 事件对象 (`$event`) 的上下文中执行这条语句。

To update the `name` property, the changed text is retrieved by following the path `$event.target.value`.

要更新`firstName`属性，就要通过路径`$event.target.value`来获取更改后的值。

If the event belongs to a directive (recall that components are directives),
`$event` has whatever shape the directive decides to produce.

如果事件属于指令（回想一下，组件是指令的一种），那么`$event`具体是什么由指令决定。


{@a eventemitter}

{@a custom-event}

### Custom events with <span class="syntax">EventEmitter</span>

### 使用 <span class="syntax">EventEmitter</span> 实现自定义事件

Directives typically raise custom events with an Angular [EventEmitter](api/core/EventEmitter).
The directive creates an `EventEmitter` and exposes it as a property.
The directive calls `EventEmitter.emit(payload)` to fire an event, passing in a message payload, which can be anything.
Parent directives listen for the event by binding to this property and accessing the payload through the `$event` object.

通常，指令使用 Angular [EventEmitter](api/core/EventEmitter) 来触发自定义事件。
指令创建一个`EventEmitter`实例，并且把它作为属性暴露出来。
指令调用`EventEmitter.emit(payload)`来触发事件，可以传入任何东西作为消息载荷。
父指令通过绑定到这个属性来监听事件，并通过`$event`对象来访问载荷。

Consider a `HeroDetailComponent` that presents hero information and responds to user actions.
Although the `HeroDetailComponent` has a delete button it doesn't know how to delete the hero itself.
The best it can do is raise an event reporting the user's delete request.

假设`HeroDetailComponent`用于显示英雄的信息，并响应用户的动作。
虽然`HeroDetailComponent`包含删除按钮，但它自己并不知道该如何删除这个英雄。
最好的做法是触发事件来报告“删除用户”的请求。

Here are the pertinent excerpts from that `HeroDetailComponent`:

下面的代码节选自`HeroDetailComponent`：


<code-example path="template-syntax/src/app/hero-detail.component.ts" linenums="false" title="src/app/hero-detail.component.ts (template)" region="template-1">
</code-example>

<code-example path="template-syntax/src/app/hero-detail.component.ts" linenums="false" title="src/app/hero-detail.component.ts (deleteRequest)" region="deleteRequest">
</code-example>

The component defines a `deleteRequest` property that returns an `EventEmitter`.
When the user clicks *delete*, the component invokes the `delete()` method,
telling the `EventEmitter` to emit a `Hero` object.

组件定义了`deleteRequest`属性，它是`EventEmitter`实例。
当用户点击*删除*时，组件会调用`delete()`方法，让`EventEmitter`发出一个`Hero`对象。

Now imagine a hosting parent component that binds to the `HeroDetailComponent`'s `deleteRequest` event.

现在，假设有个宿主的父组件，它绑定了`HeroDetailComponent`的`deleteRequest`事件。


<code-example path="template-syntax/src/app/app.component.html" linenums="false" title="src/app/app.component.html (event-binding-to-component)" region="event-binding-to-component">
</code-example>

When the `deleteRequest` event fires, Angular calls the parent component's `deleteHero` method,
passing the *hero-to-delete* (emitted by `HeroDetail`) in the `$event` variable.

当`deleteRequest`事件触发时，Angular 调用父组件的`deleteHero`方法，
在`$event`变量中传入*要删除的英雄*（来自`HeroDetail`）。

### Template statements have side effects

### 模板语句有副作用

The `deleteHero` method has a side effect: it deletes a hero.
Template statement side effects are not just OK, but expected.

`deleteHero`方法有副作用：它删除了一个英雄。
模板语句的副作用不仅没问题，反而正是所期望的。

Deleting the hero updates the model, perhaps triggering other changes
including queries and saves to a remote server.
These changes percolate through the system and are ultimately displayed in this and other views.

删除这个英雄会更新模型，还可能触发其它修改，包括向远端服务器的查询和保存。
这些变更通过系统进行扩散，并最终显示到当前以及其它视图中。

<a href="#top-of-page">back to top</a>

<a href="#top-of-page">回到顶部</a>

<hr/>

{@a two-way}

## Two-way binding ( <span class="syntax">[(...)]</span> )

## 双向数据绑定 ( <span class="syntax">[(...)]</span> )

You often want to both display a data property and update that property when the user makes changes.

我们经常需要显示数据属性，并在用户作出更改时更新该属性。

On the element side that takes a combination of setting a specific element property
and listening for an element change event.

在元素层面上，既要设置元素属性，又要监听元素事件变化。

Angular offers a special _two-way data binding_ syntax for this purpose, **`[(x)]`**.
The `[(x)]` syntax combines the brackets
of _property binding_, `[x]`, with the parentheses of _event binding_, `(x)`.

Angular 为此提供一种特殊的_双向数据绑定_语法：**`[(x)]`**。
`[(x)]`语法结合了_属性绑定_的方括号`[x]`和_事件绑定_的圆括号`(x)`。

<div class="callout is-important">

<header>
  [( )] = banana in a box
</header>



<header>
  [( )] = 盒子里的香蕉
</header>



Visualize a *banana in a box* to remember that the parentheses go _inside_ the brackets.

想象*盒子里的香蕉*来记住方括号套圆括号。


</div>

The `[(x)]` syntax is easy to demonstrate when the element has a settable property called `x`
and a corresponding event named `xChange`.
Here's a `SizerComponent` that fits the pattern.
It has a `size` value property and a companion `sizeChange` event:

当一个元素拥有可以设置的属性`x`和对应的事件`xChange`时，解释`[(x)]`语法就容易多了。
下面的`SizerComponent`符合这个模式。它有`size`属性和伴随的`sizeChange`事件：


<code-example path="template-syntax/src/app/sizer.component.ts" title="src/app/sizer.component.ts">
</code-example>

The initial `size` is an input value from a property binding.
Clicking the buttons increases or decreases the `size`, within min/max values constraints,
and then raises (_emits_) the `sizeChange` event with the adjusted size.

`size`的初始值是一个输入值，来自属性绑定。（译注：注意`size`前面的`@Input`）
点击按钮，在最小/最大值范围限制内增加或者减少`size`。
然后用调整后的`size`触发`sizeChange`事件。

Here's an example in which the `AppComponent.fontSizePx` is two-way bound to the `SizerComponent`:

下面的例子中，`AppComponent.fontSize`被双向绑定到`SizerComponent`：


<code-example path="template-syntax/src/app/app.component.html" linenums="false" title="src/app/app.component.html (two-way-1)" region="two-way-1">
</code-example>

The `AppComponent.fontSizePx` establishes the initial `SizerComponent.size` value.
Clicking the buttons updates the `AppComponent.fontSizePx` via the two-way binding.
The revised `AppComponent.fontSizePx` value flows through to the _style_ binding,
making the displayed text bigger or smaller.

`SizerComponent.size`初始值是`AppComponent.fontSizePx`。
点击按钮时，通过双向绑定更新`AppComponent.fontSizePx`。
被修改的`AppComponent.fontSizePx`通过_样式_绑定，改变文本的显示大小。

The two-way binding syntax is really just syntactic sugar for a _property_ binding and an _event_ binding.
Angular _desugars_ the `SizerComponent` binding into this:

双向绑定语法实际上是_属性_绑定和_事件绑定_的语法糖。
Angular将`SizerComponent`的绑定分解成这样：


<code-example path="template-syntax/src/app/app.component.html" linenums="false" title="src/app/app.component.html (two-way-2)" region="two-way-2">
</code-example>

The `$event` variable contains the payload of the `SizerComponent.sizeChange` event.
Angular assigns the `$event` value to the `AppComponent.fontSizePx` when the user clicks the buttons.

`$event`变量包含了`SizerComponent.sizeChange`事件的荷载。
当用户点击按钮时，Angular 将`$event`赋值给`AppComponent.fontSizePx`。

Clearly the two-way binding syntax is a great convenience compared to separate property and event bindings.

显然，比起单独绑定属性和事件，双向数据绑定语法显得非常方便。

It would be convenient to use two-way binding with HTML form elements like `<input>` and `<select>`.
However, no native HTML element follows the `x` value and `xChange` event pattern.

我们希望能在像`<input>`和`<select>`这样的 HTML 元素上使用双向数据绑定。
可惜，原生 HTML 元素不遵循`x`值和`xChange`事件的模式。

Fortunately, the Angular [_NgModel_](guide/template-syntax#ngModel) directive is a bridge that enables two-way binding to form elements.

幸运的是，Angular 以 [_NgModel_](guide/template-syntax#ngModel) 指令为桥梁，允许在表单元素上使用双向数据绑定。

<a href="#top-of-page">back to top</a>

<a href="#top-of-page">回到顶部</a>

<hr/>

{@a directives}

## Built-in directives

## 内置指令

Earlier versions of Angular included over seventy built-in directives.
The community contributed many more, and countless private directives
have been created for internal applications.

上一版本的 Angular 中包含了超过 70 个内置指令。
  社区贡献了更多，这还没算为内部应用而创建的无数私有指令。

You don't need many of those directives in Angular.
You can often achieve the same results with the more capable and expressive Angular binding system.
Why create a directive to handle a click when you can write a simple binding such as this?

在新版的 Angular 中不需要那么多指令。
  使用更强大、更富有表现力的 Angular 绑定系统，其实可以达到同样的效果。
  如果能用简单的绑定达到目的，为什么还要创建指令来处理点击事件呢？


<code-example path="template-syntax/src/app/app.component.html" region="event-binding-1" title="src/app/app.component.html" linenums="false">
</code-example>

You still benefit from directives that simplify complex tasks.
Angular still ships with built-in directives; just not as many.
You'll write your own directives, just not as many.

我们仍然可以从简化复杂任务的指令中获益。
Angular 发布时仍然带有内置指令，只是没那么多了。
我们仍会写自己的指令，只是没那么多了。

This segment reviews some of the most frequently used built-in directives,
classified as either [_attribute_ directives](guide/template-syntax#attribute-directives) or [_structural_ directives](guide/template-syntax#structural-directives).

下面来看一下那些最常用的内置指令。它们可分为[*属性型*指令](guide/template-syntax#attribute-directives) 或 [*结构型*指令](guide/template-syntax#structural-directives)。


<hr/>

{@a attribute-directives}

## Built-in _attribute_ directives

## 内置*属性型*指令

Attribute directives listen to and modify the behavior of
other HTML elements, attributes, properties, and components.
They are usually applied to elements as if they were HTML attributes, hence the name.

属性型指令会监听和修改其它HTML元素或组件的行为、元素属性（Attribute）、DOM属性（Property）。
它们通常会作为HTML属性的名称而应用在元素上。

Many details are covered in the [_Attribute Directives_](guide/attribute-directives) guide.
Many NgModules such as the [`RouterModule`](guide/router "Routing and Navigation")
and the [`FormsModule`](guide/forms "Forms") define their own attribute directives.
This section is an introduction to the most commonly used attribute directives:

更多的细节参见[_属性型指令_](guide/attribute-directives)一章。
很多Angular模块，比如[`RouterModule`](guide/router "Routing and Navigation")和[`FormsModule`](guide/forms "Forms")都定义了自己的属性型指令。
本节将会介绍几个最常用的属性型指令：

* [`NgClass`](guide/template-syntax#ngClass) - add and remove a set of CSS classes

  [`NgClass`](guide/template-syntax#ngClass) - 添加或移除一组CSS类
  
* [`NgStyle`](guide/template-syntax#ngStyle) - add and remove a set of HTML styles

  [`NgStyle`](guide/template-syntax#ngStyle) - 添加或移除一组CSS样式
  
* [`NgModel`](guide/template-syntax#ngModel) - two-way data binding to an HTML form element

  [`NgModel`](guide/template-syntax#ngModel) - 双向绑定到HTML表单元素

<a href="#top-of-page">back to top</a>

<a href="#top-of-page">回到顶部</a>

<hr/>

{@a ngClass}

### NgClass

### NgClass 指令

You typically control how elements appear
by adding and removing CSS classes dynamically.
You can bind to the `ngClass` to add or remove several classes simultaneously.

我们经常用动态添加或删除 CSS 类的方式来控制元素如何显示。
通过绑定到`NgClass`，可以同时添加或移除多个类。

A [class binding](guide/template-syntax#class-binding) is a good way to add or remove a *single* class.

[CSS 类绑定](guide/template-syntax#class-binding) 是添加或删除*单个*类的最佳途径。


<code-example path="template-syntax/src/app/app.component.html" region="class-binding-3a" title="src/app/app.component.html" linenums="false">
</code-example>

To add or remove *many* CSS classes at the same time, the `NgClass` directive may be the better choice.

当想要同时添加或移除*多个* CSS 类时，`NgClass`指令可能是更好的选择。

Try binding `ngClass` to a key:value control object.
Each key of the object is a CSS class name; its value is `true` if the class should be added,
`false` if it should be removed.

试试把`ngClass`绑定到一个 key:value 形式的控制对象。这个对象中的每个 key 都是一个 CSS 类名，如果它的 value 是`true`，这个类就会被加上，否则就会被移除。


Consider a `setCurrentClasses` component method that sets a component property,
`currentClasses` with an object that adds or removes three classes based on the
`true`/`false` state of three other component properties:

组件方法`setCurrentClasses`可以把组件的属性`currentClasses`设置为一个对象，它将会根据三个其它组件的状态为`true`或`false`而添加或移除三个类。


<code-example path="template-syntax/src/app/app.component.ts" region="setClasses" title="src/app/app.component.ts" linenums="false">
</code-example>

Adding an `ngClass` property binding to `currentClasses` sets the element's classes accordingly:  

把`NgClass`属性绑定到`currentClasses`，根据它来设置此元素的CSS类：


<code-example path="template-syntax/src/app/app.component.html" region="NgClass-1" title="src/app/app.component.html" linenums="false">
</code-example>

<div class="l-sub-section">

It's up to you to call `setCurrentClassess()`, both initially and when the dependent properties change.

你既可以在初始化时调用`setCurrentClassess()`，也可以在所依赖的属性变化时调用。


</div>


<a href="#top-of-page">back to top</a>

<a href="#top-of-page">回到顶部</a>

<hr/>

{@a ngStyle}

### NgStyle

### NgStyle 指令

You can set inline styles dynamically, based on the state of the component.
With `NgStyle` you can set many inline styles simultaneously.

我们可以根据组件的状态动态设置内联样式。
`NgStyle`绑定可以同时设置多个内联样式。

A [style binding](guide/template-syntax#style-binding) is an easy way to set a *single* style value.

[样式绑定](guide/template-syntax#style-binding)是设置*单一*样式值的简单方式。


<code-example path="template-syntax/src/app/app.component.html" region="NgStyle-1" title="src/app/app.component.html" linenums="false">
</code-example>

To set *many* inline styles at the same time, the `NgStyle` directive may be the better choice.

如果要同时设置*多个*内联样式，`NgStyle`指令可能是更好的选择。

Try binding `ngStyle` to a key:value control object.
Each key of the object is a style name; its value is whatever is appropriate for that style.

`NgStyle`需要绑定到一个 key:value 控制对象。
  对象的每个 key 是样式名，它的 value 是能用于这个样式的任何值。

Consider a `setCurrentStyles` component method that sets a component property, `currentStyles`
with an object that defines three styles, based on the state of three other component propertes:

来看看组件的`setCurrentStyles`方法，它会根据另外三个属性的状态把组件的`currentStyles`属性设置为一个定义了三个样式的对象：


<code-example path="template-syntax/src/app/app.component.ts" region="setStyles" title="src/app/app.component.ts" linenums="false">
</code-example>

Adding an `ngStyle` property binding to `currentStyles` sets the element's styles accordingly:

把`NgStyle`属性绑定到`currentStyles`，以据此设置此元素的样式：


<code-example path="template-syntax/src/app/app.component.html" region="NgStyle-2" title="src/app/app.component.html" linenums="false">
</code-example>

<div class="l-sub-section">

It's up to you to call `setCurrentStyles()`, both initially and when the dependent properties change.

你既可以在初始化时调用`setCurrentStyles()`，也可以在所依赖的属性变化时调用。


</div>


<a href="#top-of-page">back to top</a>

<a href="#top-of-page">回到顶部</a>

<hr/>

{@a ngModel}

### NgModel - Two-way binding to form elements with <span class="syntax">[(ngModel)]</span>

### NgModel - 使用<span class="syntax">[(ngModel)]</span>双向绑定到表单元素

When developing data entry forms, you often both display a data property and
update that property when the user makes changes.

当开发数据输入表单时，我们通常都要既显示数据属性又根据用户的更改去修改那个属性。

Two-way data binding with the `NgModel` directive makes that easy. Here's an example:

使用`NgModel`指令进行双向数据绑定可以简化这种工作。例子如下：


<code-example path="template-syntax/src/app/app.component.html" linenums="false" title="src/app/app.component.html (NgModel-1)" region="NgModel-1">
</code-example>

#### _FormsModule_ is required to use _ngModel_

#### 使用 `ngModel` 时需要 `FormsModule`

Before using the `ngModel` directive in a two-way data binding,
you must import the `FormsModule` and add it to the NgModule's `imports` list.
Learn more about the `FormsModule` and `ngModel` in the
[Forms](guide/forms#ngModel) guide.

在使用`ngModel`指令进行双向数据绑定之前，我们必须导入`FormsModule`并把它添加到Angular模块的`imports`列表中。
要了解`FormsModule`和`ngModel`的更多知识，参见[表单](guide/forms#ngModel)一章。

Here's how to import the `FormsModule` to make `[(ngModel)]` available.


导入`FormsModule`并让`[(ngModel)]`可用的代码如下：

<code-example path="template-syntax/src/app/app.module.1.ts" linenums="false" title="src/app/app.module.ts (FormsModule import)" >
</code-example>

#### Inside <span class="syntax">[(ngModel)]</span>

#### <span class="syntax">[(ngModel)]</span>内幕

Looking back at the `name` binding, note that
you could have achieved the same result with separate bindings to
the `<input>` element's  `value` property and `input` event.

回头看看`name`绑定，注意，你可以通过分别绑定到`<input>`元素的`value`属性和`input`事件来达到同样的效果。


<code-example path="template-syntax/src/app/app.component.html" region="without-NgModel" title="src/app/app.component.html" linenums="false">
</code-example>

That's cumbersome. Who can remember which element property to set and which element event emits user changes?
How do you extract the currently displayed text from the input box so you can update the data property?
Who wants to look that up each time?

那样显得很笨重，谁会记得该设置哪个元素属性以及当用户修改时触发哪个事件？
你该如何提取输入框中的文本并且更新数据属性？谁会希望每次都去查资料来确定这些？

That `ngModel` directive hides these onerous details behind its own  `ngModel` input and `ngModelChange` output properties.

`ngModel`指令通过自己的输入属性`ngModel`和输出属性`ngModelChange`隐藏了那些细节。


<code-example path="template-syntax/src/app/app.component.html" region="NgModel-3" title="src/app/app.component.html" linenums="false">
</code-example>

<div class="l-sub-section">

The `ngModel` data property sets the element's value property and the `ngModelChange` event property
listens for changes to the element's value.

`ngModel`输入属性会设置该元素的值，并通过`ngModelChange`的输出属性来监听元素值的变化。

The details are specific to each kind of element and therefore the `NgModel` directive only works for an element
supported by a [ControlValueAccessor](api/forms/ControlValueAccessor)
that adapts an element to this protocol.
The `<input>` box is one of those elements.
Angular provides *value accessors* for all of the basic HTML form elements and the
[_Forms_](guide/forms) guide shows how to bind to them.

各种元素都有很多特有的处理细节，因此`NgModel`指令只支持实现了[ControlValueAccessor](api/forms/ControlValueAccessor)的元素，
它们能让元素适配本协议。
`<input>`输入框正是其中之一。
Angular为所有的基础HTML表单都提供了*值访问器（Value accessor）*，[*表单*](guide/forms)一章展示了如何绑定它们。

You can't apply `[(ngModel)]` to a non-form native element or a third-party custom component
until you write a suitable *value accessor*,
a technique that is beyond the scope of this guide.

我们不能把`[(ngModel)]`用到非表单类的原生元素或第三方自定义组件上，除非写一个合适的*值访问器*，这种技巧超出了本章的范围。

You don't need a _value accessor_ for an Angular component that you write because you
can name the value and event properties
to suit Angular's basic [two-way binding syntax](guide/template-syntax#two-way) and skip `NgModel` altogether.
The [`sizer` shown above](guide/template-syntax#two-way) is an example of this technique.

我们自己写的Angular组件不需要*值访问器*，因为我们可以让值和事件的属性名适应Angular基本的[双向绑定语法](guide/template-syntax#two-way)，而不使用`NgModel`。
[前面看过的`sizer`](guide/template-syntax#two-way)就是使用这种技巧的例子。


</div>

Separate `ngModel` bindings is an improvement over binding to the element's native properties. You can do better.

使用独立的`ngModel`绑定优于绑定到该元素的原生属性，那样我们可以做得更好。

You shouldn't have to mention the data property twice. Angular should be able to capture
the component's data property and set it
with a single declaration, which it can with the `[(ngModel)]` syntax:

我们不用被迫两次引用这个数据属性，Angular可以捕获该元素的数据属性，并且通过一个简单的声明来设置它，这样它就可以使用`[(ngModel)]`语法了。


<code-example path="template-syntax/src/app/app.component.html" region="NgModel-1" title="src/app/app.component.html" linenums="false">
</code-example>

Is `[(ngModel)]` all you need? Is there ever a reason to fall back to its expanded form?

`[(ngModel)]`就是你需要的一切吗？有没有什么理由回退到它的展开形式？

The `[(ngModel)]` syntax can only _set_ a data-bound property.
If you need to do something more or something different, you can write the expanded form.

`[(ngModel)]`语法只能*设置*数据绑定属性。
如果要做更多或者做点不一样的事，也可以写它的展开形式。

The following contrived example forces the input value to uppercase:

下面这个生造的例子强制输入框的内容变成大写：


<code-example path="template-syntax/src/app/app.component.html" region="NgModel-4" title="src/app/app.component.html" linenums="false">
</code-example>

Here are all variations in action, including the uppercase version:


这里是所有这些变体的动画，包括这个大写转换的版本：

<figure >
  <img src='generated/images/guide/template-syntax/ng-model-anim.gif' alt="NgModel variations">
</figure>

<a href="#top-of-page">back to top</a>

<a href="#top-of-page">回到顶部</a>

<hr/>

{@a structural-directives}

## Built-in _structural_ directives

## 内置*结构型*指令

Structural directives are responsible for HTML layout.
They shape or reshape the DOM's _structure_, typically by adding, removing, and manipulating
the host elements to which they are attached.

结构型指令的职责是HTML布局。
它们塑造或重塑DOM的*结构*，这通常是通过添加、移除和操纵它们所附加到的宿主元素来实现的。

The deep details of structural directives are covered in the
[_Structural Directives_](guide/structural-directives) guide
where you'll learn:

关于结构型指令的详情参见[*结构型指令*](guide/structural-directives)一章，在那里我们将学到：

* why you
[_prefix the directive name with an asterisk_ (\*)](guide/structural-directives#asterisk "The * in *ngIf").

  为什么要[给结构型指令的名字加上(\*)前缀？](guide/structural-directives#asterisk "The * in *ngIf")
  
* to use [`<ng-container>`](guide/structural-directives#ngcontainer "<ng-container>")
to group elements when there is no suitable host element for the directive.

  当没有合适的宿主元素防止指令时，可用`<ng-container>`](structural-directives.html#ngcontainer "<ng-container>对元素进行分组。
  
* how to write your own structural directive.

  如何写自己的结构型指令。
  
* that you can only apply [one structural directive](guide/structural-directives#one-per-element "one per host element") to an element.

  我们只能往一个元素上应用[一个结构型指令](guide/structural-directives#one-per-element "one per host element")。

_This_ section is an introduction to the common structural directives:

*本节*是对常见结构型指令的简介：

* [`NgIf`](guide/template-syntax#ngIf) - conditionally add or remove an element from the DOM

  [`NgIf`](guide/template-syntax#ngIf) - 根据条件把一个元素添加到DOM中或从DOM移除
  
* [`NgFor`](guide/template-syntax#ngFor) - repeat a template for each item in a list

  [`NgFor`](guide/template-syntax#ngFor) - 对列表中的每个条目重复套用一个模板
  
* [`NgSwitch`](guide/template-syntax#ngSwitch) - a set of directives that switch among alternative views

  [`NgSwitch`](guide/template-syntax#ngSwitch) - 一组指令，用于切换一组视图


<hr/>

{@a ngIf}

### NgIf

### NgIf 指令

You can add or remove an element from the DOM by applying an `NgIf` directive to
that element (called the _host element_).
Bind the directive to a condition expression like `isActive` in this example.

通过把`NgIf`指令应用到元素上（称为*宿主元素*），我们可以往DOM中添加或从DOM中移除这个元素。
在下面的例子中，该指令绑定到了类似于`isActive`这样的条件表达式。


<code-example path="template-syntax/src/app/app.component.html" region="NgIf-1" title="src/app/app.component.html" linenums="false">
</code-example>

<div class="alert is-critical">

Don't forget the asterisk (`*`) in front of `ngIf`.

别忘了`ngIf`前面的星号(`*`)。


</div>

When the `isActive` expression returns a truthy value, `NgIf` adds the `HeroDetailComponent` to the DOM.
When the expression is falsy, `NgIf` removes the `HeroDetailComponent`
from the DOM, destroying that component and all of its sub-components.

当`isActive`表达式返回真值时，`NgIf`把`HeroDetailComponent`添加到DOM中；为假时，`NgIf`会从DOM中移除`HeroDetailComponent`，并销毁该组件及其所有子组件。

#### Show/hide is not the same thing

#### 这和显示/隐藏不是一回事

You can control the visibility of an element with a
[class](guide/template-syntax#class-binding) or [style](guide/template-syntax#style-binding) binding:

我们也可以通过[类绑定](guide/template-syntax#class-binding)或[样式绑定](guide/template-syntax#style-binding)来显示或隐藏一个元素。


<code-example path="template-syntax/src/app/app.component.html" region="NgIf-3" title="src/app/app.component.html" linenums="false">
</code-example>

Hiding an element is quite different from removing an element with `NgIf`.

但隐藏子树和用`NgIf`排除子树是截然不同的。

When you hide an element, that element and all of its descendents remain in the DOM.
All components for those elements stay in memory and
Angular may continue to check for changes.
You could be holding onto considerable computing resources and degrading performance,
for something the user can't see.

当隐藏子树时，它仍然留在 DOM 中。
子树中的组件及其状态仍然保留着。
即使对于不可见属性，Angular 也会继续检查变更。
子树可能占用相当可观的内存和运算资源。

When `NgIf` is `false`, Angular removes the element and its descendents from the DOM.
It destroys their components, potentially freeing up substantial resources,
resulting in a more responsive user experience.

当`NgIf`为`false`时，Angular 从 DOM 中物理地移除了这个元素子树。
它销毁了子树中的组件及其状态，也潜在释放了可观的资源，最终让用户体验到更好的性能。

The show/hide technique is fine for a few elements with few children.
You should be wary when hiding large component trees; `NgIf` may be the safer choice.

显示/隐藏的技术对于只有少量子元素的元素是很好用的，但要当心别试图隐藏大型组件树。相比之下，`NgIf`则是个更安全的选择。

#### Guard against null

#### 防范空指针错误

The `ngIf` directive is often used to guard against null.
Show/hide is useless as a guard.
Angular will throw an error if a nested expression tries to access a property of `null`.

`ngIf`指令通常会用来防范空指针错误。
而显示/隐藏的方式是无法防范的，当一个表达式尝试访问空值的属性时，Angular就会抛出一个异常。

Here we see `NgIf` guarding two `<div>`s.
The `currentHero` name will appear only when there is a `currentHero`.
The `nullHero` will never be displayed.

这里我们用`NgIf`来保护了两个`<div>`防范空指针错误。
`currentHero`的名字只有当存在`currentHero`时才会显示出来。
而`nullHero`永远不会显示。


<code-example path="template-syntax/src/app/app.component.html" region="NgIf-2" title="src/app/app.component.html" linenums="false">
</code-example>

<div class="l-sub-section">

See also the
[_safe navigation operator_](guide/template-syntax#safe-navigation-operator "Safe naviation operator (?.)")
described below.

参见稍后的[_安全导航操作符_](guide/template-syntax#safe-navigation-operator "Safe naviation operator (?.)")部分。


</div>


<a href="#top-of-page">back to top</a>

<a href="#top-of-page">回到顶部</a>

<hr/>

{@a ngFor}

### NgFor

### NgFor 指令

`NgFor` is a _repeater_ directive &mdash; a way to present a list of items.
You define a block of HTML that defines how a single item should be displayed.
You tell Angular to use that block as a template for rendering each item in the list.

`NgFor`是一个_重复器_指令 —— 自定义数据显示的一种方式。
我们的目标是展示一个由多个条目组成的列表。首先定义了一个 HTML 块，它规定了单个条目应该如何显示。
再告诉 Angular 把这个块当做模板，渲染列表中的每个条目。

Here is an example of `NgFor` applied to a simple `<div>`:

下例中，`NgFor`应用在一个简单的`<div>`上：


<code-example path="template-syntax/src/app/app.component.html" region="NgFor-1" title="src/app/app.component.html" linenums="false">
</code-example>

You can also apply an `NgFor` to a component element, as in this example:

也可以把`NgFor`应用在一个组件元素上，就下例这样：


<code-example path="template-syntax/src/app/app.component.html" region="NgFor-2" title="src/app/app.component.html" linenums="false">
</code-example>

<div class="alert is-critical">

Don't forget the asterisk (`*`) in front of `ngFor`.

不要忘了`ngFor`前面的星号 (`*`)。


</div>

The text assigned to `*ngFor` is the instruction that guides the repeater process.

赋值给`*ngFor`的文本是用于指导重复器如何工作的指令。


{@a microsyntax}

#### *ngFor microsyntax

#### NgFor 微语法

The string assigned to `*ngFor` is not a [template expression](guide/template-syntax#template-expressions).
It's a *microsyntax* &mdash; a little language of its own that Angular interprets.
The string `"let hero of heroes"` means:

赋值给`*ngFor`的字符串不是[模板表达式](guide/template-syntax#template-expressions)。
它是一个*微语法* —— 由 Angular 自己解释的小型语言。在这个例子中，字符串`"let hero of heroes"`的含义是：

> *Take each hero in the `heroes` array, store it in the local `hero` looping variable, and
make it available to the templated HTML for each iteration.*

> *取出`heroes`数组中的每个英雄，把它存入局部变量`hero`中，并在每次迭代时对模板 HTML 可用*

Angular translates this instruction into a `<ng-template>` around the host element,
then uses this template repeatedly to create a new set of elements and bindings for each `hero`
in the list.

Angular 把这个指令翻译成了一个`<ng-template>`包裹的宿主元素，然后使用这个模板重复创建出一组新元素，并且绑定到列表中的每一个`hero`。

Learn about the _microsyntax_ in the [_Structural Directives_](guide/structural-directives#microsyntax) guide.

要了解*微语法*的更多知识，参见[_结构型指令_](guide/structural-directives#microsyntax)一章。


{@a template-input-variable}

{@a template-input-variables}

### Template input variables

### 模板输入变量

The `let` keyword before `hero` creates a _template input variable_ called `hero`.
The `ngFor` directive iterates over the `heroes` array returned by the parent component's `heroes` property
and sets `hero` to the current item from the array during each iteration.

`hero`前的`let`关键字创建了一个名叫`hero`的*模板输入变量*。
`ngFor`指令在由父组件的`heroes`属性返回的`heroes`数组上迭代，每次迭代都从数组中把当前元素赋值给`hero`变量。

You reference the `hero` input variable within the `ngFor` host element
(and within its descendents) to access the hero's properties.
Here it is referenced first in an interpolation
and then passed in a binding to the `hero` property of the `<hero-detail>` component.

我们可以在`ngFor`的宿主元素（及其子元素）中引用模板输入变量`hero`，从而访问该英雄的属性。
这里它首先在一个插值表达式中被引用到，然后通过一个绑定把它传给了`<hero-detail>`组件的`hero`属性。


<code-example path="template-syntax/src/app/app.component.html" region="NgFor-1-2" title="src/app/app.component.html" linenums="false">
</code-example>

Learn more about _template input variables_ in the
[_Structural Directives_](guide/structural-directives#template-input-variable) guide.

要了解更多*模板输入变量*的知识，参见[*结构型指令*](guide/structural-directives#template-input-variable)一章。

#### *ngFor with _index_

#### 带索引的`*ngFor`

The `index` property of the `NgFor` directive context  returns the zero-based index of the item in each iteration.
You can capture the `index` in a template input variable and use it in the template.

`NgFor`指令上下文中的`index`属性返回一个从零开始的索引，表示当前条目在迭代中的顺序。
我们可以通过模板输入变量捕获这个`index`值，并把它用在模板中。

The next example captures the `index` in a variable named `i` and displays it with the hero name like this.

下面这个例子把`index`捕获到了`i`变量中，并且把它显示在英雄名字的前面。


<code-example path="template-syntax/src/app/app.component.html" region="NgFor-3" title="src/app/app.component.html" linenums="false">
</code-example>

<div class="l-sub-section">

Learn about the other `NgFor` context values such as `last`, `even`,
and `odd` in the [NgFor API reference](api/common/NgFor).

要学习更多的*类似 index* 的值，例如`last`、`even`和`odd`，请参阅 [NgFor API 参考](api/common/NgFor)。


</div>

{@a trackBy}

#### *ngFor with _trackBy_

#### 带`trackBy`的`*ngFor`


The `NgFor` directive may perform poorly, especially with large lists.
A small change to one item, an item removed, or an item added can trigger a cascade of DOM manipulations.

`ngFor`指令有时候会性能较差，特别是在大型列表中。
对一个条目的一丁点改动、移除或添加，都会导致级联的 DOM 操作。

For example, re-querying the server could reset the list with all new hero objects.

例如，我们可以通过重新从服务器查询来刷新英雄列表。
  刷新后的列表可能包含很多（如果不是全部的话）以前显示过的英雄。

Most, if not all, are previously displayed heroes.
*You* know this because the `id` of each hero hasn't changed.
But Angular sees only a fresh list of new object references.
It has no choice but to tear down the old DOM elements and insert all new DOM elements.

它们中的绝大多数（如果不是所有的话）都是以前显示过的英雄。*我们*知道这一点，是因为每个英雄的`id`没有变化。
  但在 Angular 看来，它只是一个由新的对象引用构成的新列表，
  它没有选择，只能清理旧列表、舍弃那些 DOM 元素，并且用新的 DOM 元素来重建一个新列表。

Angular can avoid this churn with `trackBy`.
Add a method to the component that returns the value `NgFor` _should_ track.
In this case, that value is the hero's `id`.

如果给它指定一个`trackBy`，Angular 就可以避免这种折腾。
  我们往组件中添加一个方法，它会返回`NgFor`*应该*追踪的值。
  在这里，这个值就是英雄的`id`。


<code-example path="template-syntax/src/app/app.component.ts" region="trackByHeroes" title="src/app/app.component.ts" linenums="false">
</code-example>

In the microsyntax expression, set `trackBy` to this method.

在微语法中，把`trackBy`设置为该方法。


<code-example path="template-syntax/src/app/app.component.html" region="trackBy" title="src/app/app.component.html" linenums="false">
</code-example>

Here is an illustration of the _trackBy_ effect.
"Reset heroes" creates new heroes with the same `hero.id`s.
"Change ids" creates new heroes with new `hero.id`s.

这里展示了`trackBy`的效果。
"Reset heroes"会创建一个具有相同`hero.id`的新英雄。
"Change ids"则会创建一个具有新`hero.id`的新英雄。

* With no `trackBy`, both buttons trigger complete DOM element replacement.

  如果没有`trackBy`，这些按钮都会触发完全的DOM元素替换。
  
* With `trackBy`, only changing the `id` triggers element replacement.


有了`trackBy`，则只有修改了`id`的按钮才会触发元素替换。

<figure >
  <img src="generated/images/guide/template-syntax/ng-for-track-by-anim.gif" alt="trackBy">
</figure>

<a href="#top-of-page">back to top</a>

<a href="#top-of-page">回到顶部</a>

<hr/>

{@a ngSwitch}

### The _NgSwitch_ directives

### `NgSwitch`指令

*NgSwitch* is like the JavaScript `switch` statement.
It can display _one_ element from among several possible elements, based on a _switch condition_.
Angular puts only the *selected* element into the DOM.

`NgSwitch`指令类似于JavaScript的`switch`语句。
它可以从多个可能的元素中根据*switch条件*来显示某一个。
Angular只会把*选中的*元素放进DOM中。

*NgSwitch* is actually a set of three, cooperating directives:
`NgSwitch`, `NgSwitchCase`, and `NgSwitchDefault` as seen in this example.

`NgSwitch`实际上包括三个相互协作的指令：`NgSwitch`、`NgSwitchCase` 和 `NgSwitchDefault`，例子如下：


<code-example path="template-syntax/src/app/app.component.html" region="NgSwitch" title="src/app/app.component.html" linenums="false">
</code-example>

<figure>
  <img src="generated/images/guide/template-syntax/switch-anim.gif" alt="trackBy">
</figure>

`NgSwitch` is the controller directive. Bind it to an expression that returns the *switch value*.
The `emotion` value in this example is a string, but the switch value can be of any type.

`NgSwitch`是主控指令，要把它绑定到一个返回*候选值*的表达式。
本例子中的`emotion`是个字符串，但实际上这个候选值可以是任意类型。

**Bind to `[ngSwitch]`**. You'll get an error if you try to set `*ngSwitch` because
`NgSwitch` is an *attribute* directive, not a *structural* directive.
It changes the behavior of its companion directives.
It doesn't touch the DOM directly.

**绑定到`[ngSwitch]`**。如果试图用`*ngSwitch`的形式使用它就会报错，这是因为`NgSwitch`是一个*属性型*指令，而不是*结构型指令*。
它要修改的是所在元素的行为，而不会直接接触DOM结构。

**Bind to `*ngSwitchCase` and `*ngSwitchDefault`**.
The `NgSwitchCase` and `NgSwitchDefault` directives are _structural_ directives
because they add or remove elements from the DOM.

**绑定到`*ngSwitchCase`和`*ngSwitchDefault`**
`NgSwitchCase` 和 `NgSwitchDefault` 指令都是*结构型指令*，因为它们会从DOM中添加或移除元素。

* `NgSwitchCase` adds its element to the DOM when its bound value equals the switch value.

  `NgSwitchCase`会在它绑定到的值等于候选值时，把它所在的元素加入到DOM中。
  
* `NgSwitchDefault` adds its element to the DOM when there is no selected `NgSwitchCase`.

  `NgSwitchDefault`会在没有任何一个`NgSwitchCase`被选中时把它所在的元素加入DOM中。

The switch directives are particularly useful for adding and removing *component elements*.
This example switches among four "emotional hero" components defined in the `hero-switch.components.ts` file.
Each component has a `hero` [input property](guide/template-syntax#inputs-outputs "Input property")
which is bound to the `currentHero` of the parent component.

这组指令在要添加或移除*组件元素*时会非常有用。
这个例子会在`hero-switch.components.ts`中定义的四个“感人英雄”组件之间选择。
每个组件都有一个[输入属性](guide/template-syntax#inputs-outputs "Input property")`hero`，它绑定到父组件的`currentHero`上。

Switch directives work as well with native elements and web components too.
For example, you could replace the `<confused-hero>` switch case with the following.

这组指令在原生元素和<a href="https://developer.mozilla.org/en-US/docs/Web/Web_Components" target="_blank" title="MDN: Web Components">Web Component</a>上都可以正常工作。
比如，你可以把`<confused-hero>`分支改成这样：


<code-example path="template-syntax/src/app/app.component.html" region="NgSwitch-div" title="src/app/app.component.html" linenums="false">
</code-example>


<a href="#top-of-page">back to top</a>

<a href="#top-of-page">回到顶部</a>

<hr/>

{@a template-reference-variable}

{@a ref-vars}

{@a ref-var}

## Template reference variables ( <span class="syntax">#var</span> )

## 模板引用变量 ( <span class="syntax">#var</span> )


A **template reference variable** is often a reference to a DOM element within a template.
It can also be a reference to an Angular component or directive or a
<a href="https://developer.mozilla.org/en-US/docs/Web/Web_Components" title="MDN: Web Components">web component</a>.

**模板引用变量**通常用来引用模板中的某个DOM元素，它还可以引用Angular组件或指令或<a href="https://developer.mozilla.org/en-US/docs/Web/Web_Components" target="_blank" title="MDN: Web Components">Web Component</a>。

Use the hash symbol (#) to declare a reference variable.
The `#phone` declares a `phone` variable on an `<input>` element.

使用井号 (#) 来声明引用变量。
`#phone`的意思就是声明一个名叫`phone`的变量来引用`<input>`元素。


<code-example path="template-syntax/src/app/app.component.html" region="ref-var" title="src/app/app.component.html" linenums="false">
</code-example>

You can refer to a template reference variable _anywhere_ in the template.
The `phone` variable declared on this `<input>` is
consumed in a `<button>` on the other side of the template

我们可以在模板中的任何地方引用模板引用变量。
比如声明在`<input>`上的`phone`变量就是在模板另一侧的`<button>`上使用的。


<code-example path="template-syntax/src/app/app.component.html" region="ref-phone" title="src/app/app.component.html" linenums="false">
</code-example>

<h3 class="no-toc">How a reference variable gets its value</h3>

### 模板引用变量怎么得到它的值？

In most cases, Angular sets the reference variable's value to the element on which it was declared.
In the previous example, `phone` refers to the _phone number_ `<input>` box.
The phone button click handler passes the _input_ value to the component's `callPhone` method.
But a directive can change that behavior and set the value to something else, such as itself.
The `NgForm` directive does that.

大多数情况下，Angular会把模板引用变量的值设置为声明它的那个元素。
在上一个例子中，`phone`引用的是表示*电话号码*的`<input>`框。
"拨号"按钮的点击事件处理器把这个*input*值传给了组件的`callPhone`方法。
不过，指令也可以修改这种行为，让这个值引用到别处，比如它自身。
`NgForm`指令就是这么做的。

The following is a *simplified* version of the form example in the [Forms](guide/forms) guide.

下面是[表单](guide/forms)一章中表单范例的*简化版*。


<code-example path="template-syntax/src/app/hero-form.component.html" title="src/app/hero-form.component.html" linenums="false">
</code-example>

A template reference variable, `heroForm`, appears three times in this example, separated
by a large amount of HTML.
What is the value of `heroForm`?

模板引用变量`heroForm`在这个例子中出现了三次，中间隔着一大堆HTML。
`heroForm`的值是什么？

If Angular hadn't taken it over when you imported the `FormsModule`,
it would be the [HTMLFormElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement).
The `heroForm` is actually a reference to an Angular [NgForm](api/forms/NgForm "API: NgForm")
directive with the ability to track the value and validity of every control in the form.

如果你没有导入过`FormsModule`，Angular就不会控制这个表单，那么它就是一个[HTMLFormElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement)实例。
这里的`heroForm`实际上是一个Angular [NgForm](api/forms/NgForm "API: NgForm") 指令的引用，
因此具备了跟踪表单中的每个控件的值和有效性的能力。

The native `<form>` element doesn't have a `form` property.
But the `NgForm` directive does, which explains how you can disable the submit button
if the `heroForm.form.valid` is invalid and pass the entire form control tree
to the parent component's `onSubmit` method.

原生的`<form>`元素没有`form`属性，但`NgForm`指令有。这就解释了为何当`heroForm.form.valid`是无效时我们可以禁用提交按钮，
并能把整个表单控件树传给父组件的`onSubmit`方法。

<h3 class="no-toc">Template reference variable warning notes</h3>

<h3 class="no-toc">关于模板引用变量的提醒</h3>

A template _reference_ variable (`#phone`) is _not_ the same as a template _input_ variable (`let phone`)
such as you might see in an [`*ngFor`](guide/template-syntax#template-input-variable).
Learn the difference in the [_Structural Directives_](guide/structural-directives#template-input-variable) guide.

模板*引用*变量 (`#phone`) 和[`*ngFor`](guide/template-syntax#template-input-variable)部分看到过的模板*输入*变量 (`let phone`) 是不同的。
要了解详情，参见[结构型指令](guide/structural-directives#template-input-variable)一章。

The scope of a reference variable is the _entire template_.
Do not define the same variable name more than once in the same template.
The runtime value will be unpredictable.

模板引用变量的作用范围是*整个模板*。
不要在同一个模板中多次定义同一个变量名，否则它在运行期间的值是无法确定的。

You can use the `ref-` prefix alternative to `#`.
This example declares the `fax` variable as `ref-fax` instead of `#fax`.

我们也可以用`ref-`前缀代替`#`。
下面的例子中就用把`fax`变量声明成了`ref-fax`而不是`#fax`。


<code-example path="template-syntax/src/app/app.component.html" region="ref-fax" title="src/app/app.component.html" linenums="false">
</code-example>


<a href="#top-of-page">back to top</a>

<a href="#top-of-page">回到顶部</a>

<hr/>

{@a inputs-outputs}

## Input and output properties ( <span class="syntax">@Input</span> and <span class="syntax">@Output</span> )

## 输入输出属性 ( <span class="syntax">@Input</span> 和 <span class="syntax">@Output</span> )

So far, you've focused mainly on binding to component members within template expressions and statements
that appear on the *right side of the binding declaration*.
A member in that position is a data binding **source**.

迄今为止，我们主要聚焦在*绑定声明的右侧*，学习如何在模板表达式和模板语句中绑定到组件成员。
当成员出现在这个位置上，则称之为数据绑定的**源**。

This section concentrates on binding to **targets**, which are directive
properties on the *left side of the binding declaration*.
These directive properties must be declared as **inputs** or **outputs**.

本节则专注于绑定到的**目标**，它位于*绑定声明中的左侧*。
这些指令的属性必须被声明成**输入**或**输出**。


<div class="alert is-important">

Remember: All **components** are **directives**.

记住：所有**组件**皆为**指令**。

</div>





<div class="l-sub-section">

Note the important distinction between a data binding **target** and a data binding **source**.

我们要重点突出下绑定**目标**和绑定**源**的区别。

The *target* of a binding is to the *left* of the `=`.
The *source* is on the *right* of the `=`.

绑定的*目标*是在`=`*左侧*的部分，
*源*则是在`=`*右侧*的部分。

The *target* of a binding is the property or event inside the binding punctuation: `[]`, `()` or `[()]`.
The *source* is either inside quotes (`" "`) or within an interpolation (`{{}}`).

绑定的*目标*是绑定符：`[]`、`()`或`[()]`中的属性或事件名，
*源*则是引号 (`" "`) 中的部分或插值符号 (`{{}}`) 中的部分。

Every member of a **source** directive is automatically available for binding.
You don't have to do anything special to access a directive member in a template expression or statement.

**源**指令中的每个成员都会自动在绑定中可用。
    不需要特别做什么，就能在模板表达式或语句中访问指令的成员。

You have *limited* access to members of a **target** directive.
You can only bind to properties that are explicitly identified as *inputs* and *outputs*.

访问**目标**指令中的成员则*受到限制*。
    只能绑定到那些显式标记为*输入*或*输出*的属性。


</div>

In the following snippet, `iconUrl` and `onSave` are data-bound members of the `AppComponent`
and are referenced within quoted syntax to the _right_ of the equals&nbsp;(`=`).

在下面的例子中，`iconUrl`和`onSave`是组件的成员，它们在`=`右侧引号语法中被引用了。


<code-example path="template-syntax/src/app/app.component.html" region="io-1" title="src/app/app.component.html" linenums="false">
</code-example>

They are *neither inputs nor outputs* of the component. They are **sources** for their bindings.
The targets are the native `<img>` and `<button>` elements.

它们既不是组件的*输入*也不是*输出*。它们是绑定的数据源。

Now look at a another snippet in which the `HeroDetailComponent`
is the **target** of a binding on the _left_ of the equals&nbsp;(`=`).

现在，看看`HeroDetailComponent`中的另一个片段，等号（`=`）*左侧*的是绑定的**目标**。


<code-example path="template-syntax/src/app/app.component.html" region="io-2" title="src/app/app.component.html" linenums="false">
</code-example>

Both `HeroDetailComponent.hero` and `HeroDetailComponent.deleteRequest` are on the **left side** of binding declarations.
`HeroDetailComponent.hero` is inside brackets; it is the target of a property binding.
`HeroDetailComponent.deleteRequest` is inside parentheses; it is the target of an event binding.

`HeroDetailComponent.hero`和`HeroDetailComponent.deleteRequest`都在绑定声明的**左侧**。
`HeroDetailComponent.hero`在方括号中，它是属性绑定的目标。
`HeroDetailComponent.deleteRequest`在圆括号中，它是事件绑定的目标。

### Declaring input and output properties

### 声明输入和输出属性

Target properties must be explicitly marked as inputs or outputs.

目标属性必须被显式的标记为输入或输出。

In the `HeroDetailComponent`, such properties are marked as input or output properties using decorators.

在`HeroDetailComponent`内部，这些属性被装饰器标记成了输入和输出属性。


<code-example path="template-syntax/src/app/hero-detail.component.ts" region="input-output-1" title="src/app/hero-detail.component.ts" linenums="false">
</code-example>

<div class="l-sub-section">

Alternatively, you can identify members in the `inputs` and `outputs` arrays
of the directive metadata, as in this example:

另外，还可以在指令元数据的`inputs`或`outputs`数组中标记出这些成员。比如这个例子：


<code-example path="template-syntax/src/app/hero-detail.component.ts" region="input-output-2" title="src/app/hero-detail.component.ts" linenums="false">
</code-example>

You can specify an input/output property either with a decorator or in a metadata array.
Don't do both!

既可以通过装饰器，也可以通过元数据数组来指定输入/输出属性。但别同时用！


</div>

### Input or output?

### 输入还是输出？

*Input* properties usually receive data values.
*Output* properties expose event producers, such as `EventEmitter` objects.

*输入*属性通常接收数据值。
*输出*属性暴露事件生产者，如`EventEmitter`对象。

The terms _input_ and _output_ reflect the perspective of the target directive.


_输入_和_输出_这两个词是从目标指令的角度来说的。

<figure >
  <img src="generated/images/guide/template-syntax/input-output.png" alt="Inputs and outputs">
</figure>

`HeroDetailComponent.hero` is an **input** property from the perspective of `HeroDetailComponent`
because data flows *into* that property from a template binding expression.

从`HeroDetailComponent`角度来看，`HeroDetailComponent.hero`是个**输入**属性，
因为数据流从模板绑定表达式流*入*那个属性。

`HeroDetailComponent.deleteRequest` is an **output** property from the perspective of `HeroDetailComponent`
because events stream *out* of that property and toward the handler in a template binding statement.

从`HeroDetailComponent`角度来看，`HeroDetailComponent.deleteRequest`是个**输出**属性，
因为事件从那个属性流*出*，流向模板绑定语句中的处理器。


<h3 id='aliasing-io'>

  <p>
     Aliasing input/output properties
  </p>

  <p>
     给输入/输出属性起别名
  </p>

</h3>

Sometimes the public name of an input/output property should be different from the internal name.

有时需要让输入/输出属性的公开名字不同于内部名字。

This is frequently the case with [attribute directives](guide/attribute-directives).
Directive consumers expect to bind to the name of the directive.
For example, when you apply a directive with a `myClick` selector to a `<div>` tag,
you expect to bind to an event property that is also called `myClick`.

这是使用 [attribute 指令](guide/attribute-directives)时的常见情况。
指令的使用者期望绑定到指令名。例如，在`<div>`上用`myClick`选择器应用指令时，
希望绑定的事件属性也叫`myClick`。


<code-example path="template-syntax/src/app/app.component.html" region="myClick" title="src/app/app.component.html" linenums="false">
</code-example>

However, the directive name is often a poor choice for the name of a property within the directive class.
The directive name rarely describes what the property does.
The `myClick` directive name is not a good name for a property that emits click messages.

然而，在指令类中，直接用指令名作为自己的属性名通常都不是好的选择。
指令名很少能描述这个属性是干嘛的。
`myClick`这个指令名对于用来发出 click 消息的属性就算不上一个好名字。

Fortunately, you can have a public name for the property that meets conventional expectations,
while using a different name internally.
In the example immediately above, you are actually binding *through the* `myClick` *alias* to
the directive's own `clicks` property.

幸运的是，可以使用约定俗成的公开名字，同时在内部使用不同的名字。
在上面例子中，实际上是把`myClick`这个别名指向了指令自己的`clicks`属性。

You can specify the alias for the property name by passing it into the input/output decorator like this:

把别名传进@Input/@Output装饰器，就可以为属性指定别名，就像这样：


<code-example path="template-syntax/src/app/click.directive.ts" region="output-myClick" title="src/app/click.directive.ts" linenums="false">
</code-example>

<div class="l-sub-section">

You can also alias property names in the `inputs` and `outputs` arrays.
You write a colon-delimited (`:`) string with
the directive property name on the *left* and the public alias on the *right*:

也可在`inputs`和`outputs`数组中为属性指定别名。
可以写一个冒号 (`:`) 分隔的字符串，*左侧*是指令中的属性名，*右侧*则是公开的别名。


<code-example path="template-syntax/src/app/click.directive.ts" region="output-myClick2" title="src/app/click.directive.ts" linenums="false">
</code-example>

</div>


<a href="#top-of-page">back to top</a>

<a href="#top-of-page">回到顶部</a>

<hr/>

{@a expression-operators}

## Template expression operators

## 模板表达式操作符

The template expression language employs a subset of JavaScript syntax supplemented with a few special operators
for specific scenarios. The next sections cover two of these operators: _pipe_ and _safe navigation operator_.

模板表达式语言使用了 JavaScript 语法的子集，并补充了几个用于特定场景的特殊操作符。
  下面介绍其中的两个：_管道_和_安全导航操作符_。


{@a pipe}

### The pipe operator ( <span class="syntax">|</span> )


### 管道操作符 ( | )

The result of an expression might require some transformation before you're ready to use it in a binding.
For example, you might display a number as a currency, force text to uppercase, or filter a list and sort it.

在绑定之前，表达式的结果可能需要一些转换。例如，可能希望把数字显示成金额、强制文本变成大写，或者过滤列表以及进行排序。

Angular [pipes](guide/pipes) are a good choice for small transformations such as these.
Pipes are simple functions that accept an input value and return a transformed value.
They're easy to apply within template expressions, using the **pipe operator (`|`)**:

Angular [管道](guide/pipes)对像这样的小型转换来说是个明智的选择。
管道是一个简单的函数，它接受一个输入值，并返回转换结果。
它们很容易用于模板表达式中，只要使用**管道操作符 (`|`) **就行了。


<code-example path="template-syntax/src/app/app.component.html" region="pipes-1" title="src/app/app.component.html" linenums="false">
</code-example>

The pipe operator passes the result of an expression on the left to a pipe function on the right.

管道操作符会把它左侧的表达式结果传给它右侧的管道函数。

You can chain expressions through multiple pipes:

还可以通过多个管道串联表达式：


<code-example path="template-syntax/src/app/app.component.html" region="pipes-2" title="src/app/app.component.html" linenums="false">
</code-example>

And you can also [apply parameters](guide/pipes#parameterizing-a-pipe) to a pipe:

还能对它们使用参数：


<code-example path="template-syntax/src/app/app.component.html" region="pipes-3" title="src/app/app.component.html" linenums="false">
</code-example>

The `json` pipe is particularly helpful for debugging bindings:

`json`管道对调试绑定特别有用：


<code-example path="template-syntax/src/app/app.component.html" linenums="false" title="src/app/app.component.html (pipes-json)" region="pipes-json">
</code-example>

The generated output would look something like this

它生成的输出是这样的：


<code-example language="json">
  { "id": 0, "name": "Hercules", "emotion": "happy",
    "birthdate": "1970-02-25T08:00:00.000Z",
    "url": "http://www.imdb.com/title/tt0065832/",
    "rate": 325 }
</code-example>


<a href="#top-of-page">back to top</a>

<a href="#top-of-page">回到顶部</a>

<hr/>

{@a safe-navigation-operator}

### The safe navigation operator ( <span class="syntax">?.</span> ) and null property paths

### 安全导航操作符 ( ?. ) 和空属性路径

The Angular **safe navigation operator (`?.`)** is a fluent and convenient way to
guard against null and undefined values in property paths.
Here it is, protecting against a view render failure if the `currentHero` is null.

Angular 的**安全导航操作符 (`?.`) **是一种流畅而便利的方式，用来保护出现在属性路径中 null 和 undefined 值。
下例中，当`currentHero`为空时，保护视图渲染器，让它免于失败。


<code-example path="template-syntax/src/app/app.component.html" region="safe-2" title="src/app/app.component.html" linenums="false">
</code-example>

What happens when the following data bound `title` property is null?

如果下列数据绑定中`title`属性为空，会发生什么？


<code-example path="template-syntax/src/app/app.component.html" region="safe-1" title="src/app/app.component.html" linenums="false">
</code-example>

The view still renders but the displayed value is blank; you see only "The title is" with nothing after it.
That is reasonable behavior. At least the app doesn't crash.

这个视图仍然被渲染出来，但是显示的值是空；只能看到 “The title is”，它后面却没有任何东西。
这是合理的行为。至少应用没有崩溃。

Suppose the template expression involves a property path, as in this next example
that displays the `name` of a null hero.

假设模板表达式涉及属性路径，在下例中，显示一个空 (null) 英雄的`firstName`。


<code-example language="html">
  The null hero's name is {{nullHero.name}}
</code-example>

JavaScript throws a null reference error, and so does Angular:

JavaScript 抛出了空引用错误，Angular 也是如此：
  

<code-example format="nocode">
  TypeError: Cannot read property 'name' of null in [null].
</code-example>

Worse, the *entire view disappears*.

晕，*整个视图都不见了*。

This would be reasonable behavior if the `hero` property could never be null.
If it must never be null and yet it is null,
that's a programming error that should be caught and fixed.
Throwing an exception is the right thing to do.

如果确信`hero`属性永远不可能为空，可以声称这是合理的行为。
如果它必须不能为空，但它仍然是空值，实际上是制造了一个编程错误，它应该被捕获和修复。
这种情况应该抛出异常。

On the other hand, null values in the property path may be OK from time to time,
especially when the data are null now and will arrive eventually.

另一方面，属性路径中的空值可能会时常发生，特别是当我们知道数据最终会出现。

While waiting for data, the view should render without complaint, and
the null property path should display as blank just as the `title` property does.

当等待数据的时候，视图渲染器不应该抱怨，而应该把这个空属性路径显示为空白，就像上面`title`属性那样。

Unfortunately, the app crashes when the `currentHero` is null.

不幸的是，当`currentHero`为空的时候，应用崩溃了。

You could code around that problem with [*ngIf](guide/template-syntax#ngIf).

可以通过用[NgIf](guide/template-syntax#ngIf)代码环绕它来解决这个问题。


<code-example path="template-syntax/src/app/app.component.html" region="safe-4" title="src/app/app.component.html" linenums="false">
</code-example>

You could try to chain parts of the property path with `&&`, knowing that the expression bails out
when it encounters the first null.

或者可以尝试通过`&&`来把属性路径的各部分串起来，让它在遇到第一个空值的时候，就返回空。


<code-example path="template-syntax/src/app/app.component.html" region="safe-5" title="src/app/app.component.html" linenums="false">
</code-example>

These approaches have merit but can be cumbersome, especially if the property path is long.
Imagine guarding against a null somewhere in a long property path such as `a.b.c.d`.

这些方法都有价值，但是会显得笨重，特别是当这个属性路径非常长的时候。
想象一下在一个很长的属性路径（如`a.b.c.d`）中对空值提供保护。


The Angular safe navigation operator (`?.`) is a more fluent and convenient way to guard against nulls in property paths.
The expression bails out when it hits the first null value.
The display is blank, but the app keeps rolling without errors.

Angular 安全导航操作符 (`?.`) 是在属性路径中保护空值的更加流畅、便利的方式。
表达式会在它遇到第一个空值的时候跳出。
显示是空的，但应用正常工作，而没有发生错误。


<code-example path="template-syntax/src/app/app.component.html" region="safe-6" title="src/app/app.component.html" linenums="false">
</code-example>

It works perfectly with long property paths such as `a?.b?.c?.d`.
在像`a?.b?.c?.d`这样的长属性路径中，它工作得很完美。<a href="#top-of-page">back to top</a>

<hr/>

{@a non-null-assertion-operator}

### The non-null assertion operator ( <span class="syntax">!</span> )

### 非空断言操作符（<span class="syntax">!</span>）

As of Typescript 2.0, you can enforce [strict null checking](http://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html "Strict null checking in TypeScript") with the `--strictNullChecks` flag. TypeScript then ensures that no variable is _unintentionally_ null or undefined.

在 TypeScript 2.0 中，我们可以使用`--strictNullChecks`标志强制开启[严格空值检查](http://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html "Strict null checking in TypeScript")。TypeScript就会确保不存在意料之外的null或undefined。

In this mode, typed variables disallow null and undefined by default. The type checker throws an error if you leave a variable unassigned or try to assign null or undefined to a variable whose type disallows null and undefined.

在这种模式下，有类型的变量默认是不允许null或undefined值的，如果有未赋值的变量，或者试图把null或undefined赋值给不允许为空的变量，类型检查器就会抛出一个错误。

The type checker also throws an error if it can't determine whether a variable will be null or undefined at runtime.
You may know that can't happen but the type checker doesn't know.
You tell the type checker that it can't happen by applying the post-fix
[_non-null assertion operator (!)_](http://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator "Non-null assertion operator").

如果类型检查器在运行期间无法确定一个变量是null或undefined，那么它也会抛出一个错误。
我们自己可能知道它不会为空，但类型检查器不知道。
所以我们要告诉类型检查器，它不会为空，这时就要用到[*非空断言操作符*](http://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator "Non-null assertion operator")。

The _Angular_ **non-null assertion operator (`!`)** serves the same purpose in an Angular template.

*Angular* 模板中的**非空断言操作符（`!`）也是同样的用途。

For example, after you use [*ngIf](guide/template-syntax#ngIf) to check that `hero` is defined, you can assert that
`hero` properties are also defined.

例如，在用[*ngIf](guide/template-syntax#ngIf)来检查过`hero`是已定义的之后，就可以断言`hero`属性一定是已定义的。

<code-example path="template-syntax/src/app/app.component.html" region="non-null-assertion-1" title="src/app/app.component.html" linenums="false">
</code-example>

When the Angular compiler turns your template into TypeScript code,
it prevents TypeScript from reporting that `hero.name` might be null or undefined.

在 Angular 编译器把你的模板转换成 TypeScript 代码时，这个操作符会防止 TypeScript 报告 "`hero.name`可能为null或undefined"的错误。

Unlike the [_safe navigation operator_](guide/template-syntax#safe-navigation-operator "Safe naviation operator (?.)"),
the **non-null assertion operator** does not guard against null or undefined.
Rather it tells the TypeScript type checker to suspend strict null checks for a specific property expression.

与[_安全导航操作符_](guide/template-syntax#safe-navigation-operator "Safe naviation operator (?.)")不同的是，**非空断言操作符**不会防止出现null或undefined。
它只是告诉 TypeScript 的类型检查器对特定的属性表达式，不做 "严格空值检测"。

You'll need this template operator when you turn on strict null checks. It's optional otherwise.

如果我们打开了严格控制检测，那就要用到这个模板操作符，而其它情况下则是可选的。

<a href="#top-of-page">back to top</a>

<a href="#top-of-page">回到顶部</a>

<hr/>

## Summary

## 小结

You've completed this survey of template syntax.
Now it's time to put that knowledge to work on your own components and directives.

我们完成了模板语法的概述。现在，该把如何写组件和指令的知识投入到实际工作当中了。
