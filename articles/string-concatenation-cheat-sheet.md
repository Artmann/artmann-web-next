---
title: String Concatenation Cheat Sheet
blurb: Your one resource for String Concatenation in different languages.
imageUrl: https://portswigger.net/cms/images/ac/27/96b3f5eb000e-article-xss-cheat-sheet-article.png
publishedAt: 2017-02-10
status: Published
tags: Strings
---

When switching between languages I often find my self Googling on how to do string concatenation and especially interpolation which no two languages seems to agree on.

For future reference, Here's how you do it.

## C

In C, strings are really just plain `char` arrays. Therefore, you can't directly concatenate them with other strings.

You can use the `strcat` function, which appends the string pointed to by `src` to the end of the string pointed to by `dest`:

```c
char *strcat(char *dest, const char *src);
```

## C++

C++ has `std::string` which is used instead of `char` arrays.

```
string a = "Hello ";
string b = "World";
string c = a + b;
```

## C&#35;

C# lets you use the `+` operator to concatenate strings.

```cpp
string name = "Chris";
Console.WriteLine("Hello " + name);
```

It also allows for interpolation.

```
string firstName = "Sally";
string lastName = "Morgan";

Console.WriteLine($"Hello {firstName} {lastName}");
```

## Go

You can use the `+` operator to concatenate strings in Go.


```go
firtName := "James"
lastName := "Pierce"

fmt.Println(firstName + " " + lastName)
```

There's also `fmt.Sprintf` which lets you format strings.

```go
firtName := "Denise"
lastName := "Richards"

fullName = fmt.Sprintf("%s %s", firstName, lastName)
```

Strings are read-only in Go so a new object is generated every time you concatenate two strings. If this becomes a problem you can use `bytes.buffer`.

```go
var buffer bytes.Buffer

buffer.WriteString("Hello")
buffer.WriteString(" ")
buffer.WriteString("World")

fmt.Println(buffer.String())
```

## Java

Java also uses the `+` operator to concatenate strings.

```java
String name = "Molly";

System.out.println("Hello " + name);
```

## Javascript

Javascript uses the `+` operator to concatenate strings.

```js
let firstName = 'Isabela';
let lastName = 'Wang';

console.log(firstName + ' ' + lastName);
```

You can also interpolate strings with backticks.

```js
let firstName = 'Megan';
let lastName = 'Fox';

console.log(`Hello ${firstName} ${lastName}`);
```

## PHP

PHP uses `.` to concatenate strings.

```php
$firstName = 'Lisa';
$lastName = 'Swan';

echo $firstname . ' ' . $lastName;
```

Only variables can be interpolated.

```php
$name = 'Michelle';

echo "Hello {$name}";
```

## Ruby

Ruby uses the `+` operator to concatenate strings.

```ruby
fist_name = 'Tyler'
last_name = 'Reed'

puts fist_name + ' ' + last_name
```

And it uses `#{}` for interpolation

```ruby
name = 'Sarah'

puts "Hello #{name}"
```

## Python

Python uses the `+` operator to concatenate strings.

```python
firstName = "Emma"
lastName = "Stone"

print(firstName + " " + lastName)
```

And from version 3.6 you can interpolate strings.

```python
name = "Sally"

print(f"Hello {name}")
```
