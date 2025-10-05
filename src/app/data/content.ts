// app/data/content.ts

// ===== Type Definitions =====
export interface TopicContent {
  overview: string;
  keyPoints: string[];
  code: string;
  output: string;
}

export interface Topic {
  title: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  content: TopicContent;
}

export interface Category {
  title: string;
  icon: string;
  topics: {
    [key: string]: Topic;
  };
}

export interface Content {
  [key: string]: Category;
}

// ===== Data =====
export const content: Content = {
  basics: {
    title: "Fundamentals",
    icon: "📚",
    topics: {
      project: {
        title: "Project Folder",
        description: "Getting Started with Go Development",
        level: "Beginner",
        content: {
          overview:
            "When starting Go development, first create a Go project folder. Initialize the module with the go mod init command, create a main.go file, and start writing code.",
          keyPoints: [
            "Create project folder with mkdir/cd",
            "Initialize module with go mod init",
            "Create main.go file and start coding",
          ],
          code: `package main

import "fmt"

func main() {
    fmt.Println("Welcome to Go")
}`,
          output: "Welcome to Go",
        },
      },
      features: {
        title: "Go Language Features",
        description: "Basic Language Specifications of Go",
        level: "Beginner",
        content: {
          overview:
            "Before explaining Go's basic syntax, let's briefly describe what kind of language Go is. Those familiar with other programming languages may be confused by the absence of ternary operators, inheritance, and exceptions in Go.",
          keyPoints: [
            "Has GC (Garbage Collector)",
            "Uses static typing",
            "Uses pointers",
            "No ternary operator",
            "No inheritance",
            "No exceptions (uses panic/recover)",
          ],
          code: `package main

import "fmt"

func main() {
    // Simple code leveraging Go's features
    text := "Go is a simple and powerful language"
    fmt.Println(text)
}`,
          output: "Go is a simple and powerful language",
        },
      },
      types: {
        title: "Static Types",
        description: "Go's Built-in Types",
        level: "Beginner",
        content: {
          overview:
            "Use var to declare variables in Go. Go has the following built-in types.",
          keyPoints: [
            "interface{} (any) - any type",
            "bool - boolean value",
            "Numeric types: int, int8-64, uint, uint8-64, float32/64",
            "String types: string, rune",
            "Others: byte, complex64/128, error, uintptr",
          ],
          code: `package main

import "fmt"

func main() {
    var count int
    var username string = "Developer"
    years := 42
    
    fmt.Printf("count=%d, username=%s, years=%d\\n", count, username, years)
}`,
          output: "count=0, username=Developer, years=42",
        },
      },
      syntax: {
        title: "Basic Syntax",
        description: "Variable Declaration and Type System",
        level: "Beginner",
        content: {
          overview:
            "We'll explain Go's basic syntax. While this guide doesn't cover all of Go's syntax, it explains the syntax needed to build applications. Since Go is a programming language conscious of C, there are some comparisons between the two for those familiar with C, but those unfamiliar with C should still understand most of it.",
          keyPoints: [
            "Declare variables with var",
            "Short declaration with type inference using :=",
            "Type safety through static typing",
          ],
          code: `package main

import "fmt"

func main() {
    var alpha int = 17
    beta := 29
    var info string
    info = "Variable usage example"
    
    fmt.Println(info, alpha, beta)
}`,
          output: "Variable usage example 17 29",
        },
      },
      iota: {
        title: "iota (Enumeration)",
        description: "Generating Sequential Constant Values",
        level: "Beginner",
        content: {
          overview:
            "Go has no enumeration type. While you can declare constants with const, there's no enum like in C that can create unique values. However, iota allows you to declare similar constants.",
          keyPoints: [
            "iota automatically generates sequential values",
            "Used within const blocks",
            "Starts from 0 in each const block",
          ],
          code: `package main

import "fmt"

const (
    Grape = iota   // 0
    Mango          // 1
    Peach          // 2
)

const (
    Tiger = iota   // 0
    Bear           // 1
    Wolf           // 2
)

func main() {
    fmt.Println(Grape, Mango, Peach)
    fmt.Println(Tiger, Bear, Wolf)
}`,
          output: "0 1 2\n0 1 2",
        },
      },
      const: {
        title: "const (Constant Declaration)",
        description: "How to Declare Constants",
        level: "Beginner",
        content: {
          overview:
            "You can declare constants using const. Unlike variables, unused constants don't cause compilation errors. const can declare booleans, numeric types like int/int32/int64 and float32/float64, complex numbers, and strings. You cannot declare slices, arrays, or struct values.",
          keyPoints: [
            "Define immutable values with const",
            "No compilation error if unused",
            "Only basic types can be declared (no slices, arrays, structs)",
          ],
          code: `package main

import "fmt"

const (
    base = 7
    doubled = 7 + base
    tripled = 9.5 + base
)

const greeting = "Good " + "Day"

func main() {
    fmt.Println(base, doubled, tripled)
    fmt.Println(greeting)
}`,
          output: "7 14 16.5\nGood Day",
        },
      },
      variables: {
        title: "Variable Declaration",
        description: "var and Type Inference",
        level: "Beginner",
        content: {
          overview:
            "Variable declarations can be written by omitting var. When the type is clear from the literal on the right side, the variable type on the left can be inferred, allowing you to omit the type. Unlike other programming languages, Go will cause a compilation error if you declare a variable but don't use it.",
          keyPoints: [
            "Short declaration with type inference using :=",
            "No semicolons (;) used",
            "Unused variables cause compilation errors",
          ],
          code: `package main

import "fmt"

func main() {
    var total int = 8
    
    // Short declaration with type inference
    alpha := 6
    beta := 2.5
    
    // Treated as float64 if type not specified
    gamma := 3.8 + (float64(alpha)+4)*float64(beta)
    
    fmt.Println(total, alpha, beta, gamma)
}`,
          output: "8 6 2.5 28.8",
        },
      },
      typeDefine: {
        title: "Type Specification",
        description: "Type Definition and Type Safety",
        level: "Beginner",
        content: {
          overview:
            "You can also declare by specifying types. Each type needs separate const declarations. By declaring with type specification, you can cause compilation errors when assigning to different types.",
          keyPoints: [
            "Define custom types with type",
            "Enhance type safety",
            "Assignment to different types causes compilation error",
          ],
          code: `package main

import "fmt"

type Vegetable int
type Vehicle int

const (
    Carrot   Vegetable = iota // Vegetable(0)
    Tomato                    // Vegetable(1)
    Lettuce                   // Vegetable(2)
)

const (
    Car   Vehicle = iota       // Vehicle(0)
    Bike                       // Vehicle(1)
    Truck                      // Vehicle(2)
)

func main() {
    var veg Vegetable = Carrot
    fmt.Println(veg)
    
    // veg = Bike // Compilation error
}`,
          output: "0",
        },
      },
      errorHandling: {
        title: "Error Handling",
        description: "Multiple Return Values and Error Checking",
        level: "Beginner",
        content: {
          overview:
            "In Go, when calling a function that may produce an error, it's recommended to check err first and return err immediately. The specification of writing type names after variable or function names is designed with this pattern in mind. Go can return multiple values. Let's consider a function that returns user information and errors simultaneously.",
          keyPoints: [
            "Return errors with multiple return values",
            "Check errors immediately",
            "Type names written after variable or function names",
          ],
          code: `package main

import (
    "errors"
    "fmt"
)

var ErrMissing = errors.New("entry not found")

func SearchProfile(id string) (string, error) {
    if id == "" {
        return "", ErrMissing
    }
    return id, nil
}

func main() {
    profile, err := SearchProfile("Charlie")
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    fmt.Println("Profile:", profile)
}`,
          output: "Profile: Charlie",
        },
      },
      conditional: {
        title: "Conditional Branching",
        description: "if and switch Statements",
        level: "Beginner",
        content: {
          overview:
            "if statements don't require parentheses. You can also write using semicolons as follows. Variables declared in the if statement like user or err can also be used in else. switch statements are almost the same as C, but you don't need to write break.",
          keyPoints: [
            "No parentheses needed for if statements",
            "Can declare variables and conditions simultaneously with semicolon",
            "switch automatically breaks (use fallthrough to continue)",
          ],
          code: `package main

import "fmt"

func main() {
    // if statement
    num := 9
    if num == 9 {
        fmt.Println("num is 9")
    }
    
    // switch statement
    choice := 4
    switch choice {
    case 1:
        fmt.Println("one")
    case 2:
        fmt.Println("two")
    case 3, 4:
        fmt.Println("three or four")
    default:
        fmt.Println("other")
    }
}`,
          output: "num is 9\nthree or four",
        },
      },
      loops: {
        title: "Loops",
        description: "How to Use for Statements",
        level: "Beginner",
        content: {
          overview:
            "Use for statements for loops. There are 4 types of for statements: C-style, same as C's while statement, iteration using range, and infinite loop.",
          keyPoints: [
            "C-style: for i := 0; i < len(s); i++",
            "while-style: for condition",
            "range-style: for i, v := range slice",
            "Infinite loop: for { }",
          ],
          code: `package main

import "fmt"

func main() {
    // C-style
    for idx := 0; idx < 5; idx++ {
        fmt.Print(idx, " ")
    }
    fmt.Println()
    
    // while-style
    counter := 0
    for counter < 5 {
        fmt.Print(counter, " ")
        counter++
    }
    fmt.Println()
    
    // range-style
    items := []int{100, 200, 300}
    for position, element := range items {
        fmt.Printf("[%d]=%d ", position, element)
    }
}`,
          output: "0 1 2 3 4 \n0 1 2 3 4 \n[0]=100 [1]=200 [2]=300 ",
        },
      },
      naming: {
        title: "Naming Conventions",
        description: "Go's Naming Rules and Pascal Case",
        level: "Beginner",
        content: {
          overview:
            "In Go, variables are generally given short names. However, there's a reason for this. The length of a name should not exceed the substance of its information. For local variables, the name should convey information like index or idx as immediately as possible. Similarly, i and j are a better pair than i1 and i2. In Go, variables and functions use Pascal Case, and underscores (_) are not used.",
          keyPoints: [
            "Variable names are short, conveying information immediately",
            "Use index, idx, i, j for local variables",
            "Use Pascal Case (UpdateUser not updateUser)",
            "Don't use underscores",
          ],
          code: `package main

import "fmt"

// Pascal Case example
func ModifyAccount(username string) {
    fmt.Println("Modifying:", username)
}

func main() {
    // Short variable names
    for idx := 0; idx < 6; idx++ {
        fmt.Print(idx, " ")
    }
    fmt.Println()
    
    ModifyAccount("David")
}`,
          output: "0 1 2 3 4 5 \nModifying: David",
        },
      },
    },
  },
  functions: {
    title: "Functions and Methods",
    icon: "⚡",
    topics: {
      functions: {
        title: "Functions",
        description: "Defining and Using Functions",
        level: "Beginner",
        content: {
          overview:
            "Learn about function definition methods, arguments, and return values. Go supports multiple return values.",
          keyPoints: [
            "Define functions with func",
            "Multiple return values possible",
            "Named return values improve readability",
          ],
          code: `package main

import "fmt"

func multiply(p, q int) int {
    return p * q
}

func exchange(first, second string) (string, string) {
    return second, first
}

func main() {
    product := multiply(8, 7)
    fmt.Println("Product:", product)
    
    left, right := exchange("X", "Y")
    fmt.Println(left, right)
}`,
          output: "Product: 56\nY X",
        },
      },
      methods: {
        title: "Methods",
        description: "Defining Methods on Types",
        level: "Intermediate",
        content: {
          overview:
            "Learn how to define functions (methods) associated with specific types.",
          keyPoints: [
            "Define methods using receivers",
            "Value receivers and pointer receivers",
            "Encapsulate struct behavior",
          ],
          code: `package main

import "fmt"

type Square struct {
    Side float64
}

func (sq Square) Area() float64 {
    return sq.Side * sq.Side
}

func main() {
    shape := Square{9}
    fmt.Printf("Area: %.1f\\n", shape.Area())
}`,
          output: "Area: 81.0",
        },
      },
      closures: {
        title: "Closures",
        description: "Function Literals and Variable Capture",
        level: "Intermediate",
        content: {
          overview:
            "Learn advanced functional programming using anonymous functions and closures.",
          keyPoints: [
            "Assign anonymous functions to variables",
            "Capture external variables",
            "Functions that return functions",
          ],
          code: `package main

import "fmt"

func incrementer() func() int {
    total := 0
    return func() int {
        total++
        return total
    }
}

func main() {
    inc := incrementer()
    fmt.Println(inc()) // 1
    fmt.Println(inc()) // 2
    fmt.Println(inc()) // 3
}`,
          output: "1\n2\n3",
        },
      },
    },
  },
  dataStructures: {
    title: "Data Structures",
    icon: "🗂️",
    topics: {
      arraysSlices: {
        title: "Arrays and Slices",
        description: "Fixed-length Arrays and Variable-length Slices",
        level: "Beginner",
        content: {
          overview:
            "Go has two types that seem similar but are different: arrays and slices. Arrays are fixed-length, while slices can be thought of as variable-length arrays. Both arrays and slices start from 0. Referencing a position beyond the slice length causes a panic.",
          keyPoints: [
            "Arrays are fixed-length: var a [4]int",
            "Slices are variable-length: var a []int or make([]int, 3)",
            "Add elements with append",
            "Difference between len (length) and cap (capacity)",
            "Slice operations: a[2:5] for partial reference",
          ],
          code: `package main

import "fmt"

func main() {
    // Array (fixed-length)
    var fixedArray [6]int
    fixedArray[0] = 9
    
    // Slice (variable-length)
    dynamicList := make([]int, 4)
    dynamicList[0], dynamicList[1], dynamicList[2], dynamicList[3] = 12, 24, 36, 48
    
    // Add with append
    dynamicList = append(dynamicList, 60, 72, 84)
    fmt.Println(dynamicList)
    fmt.Printf("Length: %d, Capacity: %d\\n", len(dynamicList), cap(dynamicList))
    
    // Slice operation
    fmt.Println(dynamicList[2:5])
}`,
          output: "[12 24 36 48 60 72 84]\nLength: 7, Capacity: 8\n[36 48 60]",
        },
      },
      strings: {
        title: "Strings",
        description: "String Operations and rune Type",
        level: "Beginner",
        content: {
          overview:
            "As mentioned, Go strings can be concatenated with +. Since strings are composed of byte sequences, you can access them using indices. However, since Go strings are immutable, you need to convert them to byte sequences to modify their contents. Go also has a rune type, which allows conversion by Unicode code point.",
          keyPoints: [
            "Concatenate strings with +",
            "Strings are immutable",
            "Convert to byte sequence to edit: []byte(s)",
            "Handle by Unicode code point with rune type",
            "Multi-line strings with backticks `",
          ],
          code: `package main

import "fmt"

func main() {
    // String concatenation
    greeting := "Good "
    greeting += "Evening"
    fmt.Println(greeting)
    
    // Convert to byte sequence to edit
    bytes := []byte(greeting)
    bytes[0] = 'g'
    greeting = string(bytes)
    fmt.Println(greeting)
    
    // rune type
    message := "おはよう日本"
    runes := []rune(message)
    runes[3] = 'う'
    fmt.Println(string(runes))
    
    // Multi-line string
    document := \`This is
a multi-line
text.\`
    fmt.Println(document)
}`,
          output:
            "Good Evening\ngood Evening\nおはよう日本\nThis is\na multi-line\ntext.",
        },
      },
      maps: {
        title: "Maps",
        description: "Key-Value Pairs",
        level: "Beginner",
        content: {
          overview:
            "Maps are unordered key-value pairs. Keys can be types other than strings. However, just declaring will store a special value called nil. Accessing elements directly will cause a panic. Use make to create slices.",
          keyPoints: [
            "Maps have no order",
            "Create with make(map[string]int)",
            "Access values by key: m[key]",
            "Delete with delete(m, key)",
            "Check existence: value, ok := m[key]",
          ],
          code: `package main

import "fmt"

func main() {
    // Create map
    ages := make(map[string]int)
    ages["Emma"] = 31
    ages["Frank"] = 38
    
    fmt.Println(ages["Emma"])
    
    // Check existence
    result, exists := ages["George"]
    if exists {
        fmt.Println("Found:", result)
    } else {
        fmt.Println("Not found")
    }
    
    // Delete
    delete(ages, "Frank")
    fmt.Println(ages)
}`,
          output: "31\nNot found\nmap[Emma:31]",
        },
      },
      rangeLoop: {
        title: "for Statement with range",
        description: "Iterating Over Collections",
        level: "Beginner",
        content: {
          overview:
            "Finally, iterate over maps and slices. Maps and slices are discussed later. Like C, you can break loops with break and continue loops with continue. Go also has Labeled Break notation, which allows you to exit outer loops at once from inside nested loops.",
          keyPoints: [
            "Iterate over maps with for k, v := range map",
            "Iterate over slices with for i, v := range slice",
            "Iterate over channels with for v := range channel",
            "break and continue are available",
            "Exit nested loops at once with Labeled Break",
          ],
          code: `package main

import "fmt"

func main() {
    // map range
    scores := map[string]int{"Henry": 87, "Iris": 94}
    for name, score := range scores {
        fmt.Printf("%s: %d\\n", name, score)
    }
    
    // slice range
    values := []int{18, 27, 36}
    for idx, val := range values {
        fmt.Printf("[%d]=%d\\n", idx, val)
    }
    
    // Labeled Break
    done:
    for outer := 0; outer < 5; outer++ {
        for inner := 0; inner < 5; inner++ {
            if outer == 3 && inner == 2 {
                break done
            }
            fmt.Printf("(%d,%d) ", outer, inner)
        }
    }
}`,
          output:
            "Henry: 87\nIris: 94\n[0]=18\n[1]=27\n[2]=36\n(0,0) (0,1) (0,2) (0,3) (0,4) (1,0) (1,1) (1,2) (1,3) (1,4) (2,0) (2,1) (2,2) (2,3) (2,4) (3,0) (3,1) ",
        },
      },
    },
  },
  concurrency: {
    title: "Concurrency",
    icon: "🚀",
    topics: {
      goroutines: {
        title: "Goroutines",
        description: "Concurrent Processing with Lightweight Threads",
        level: "Intermediate",
        content: {
          overview: "Easily achieve concurrent processing with the go keyword.",
          keyPoints: [
            "Execute functions concurrently with go",
            "Lightweight, can run thousands",
            "Synchronize with sync.WaitGroup",
          ],
          code: `package main

import (
    "fmt"
    "time"
)

func display(text string) {
    for count := 0; count < 5; count++ {
        fmt.Println(text)
        time.Sleep(120 * time.Millisecond)
    }
}

func main() {
    go display("Sub")
    display("Main")
}`,
          output: "Main\nSub\nMain\nSub\nMain\nSub\nMain\nSub\nMain\nSub",
        },
      },
      channels: {
        title: "Channels",
        description: "Communication Between Goroutines",
        level: "Intermediate",
        content: {
          overview: "Use channels to safely exchange data between goroutines.",
          keyPoints: [
            "Create channels with make(chan Type)",
            "Send and receive data with <-",
            "Buffered channels also possible",
          ],
          code: `package main

import "fmt"

func main() {
    pipe := make(chan string)
    
    go func() {
        pipe <- "Greetings"
    }()
    
    text := <-pipe
    fmt.Println(text)
}`,
          output: "Greetings",
        },
      },
      select: {
        title: "Select Statement",
        description: "Controlling Multiple Channels",
        level: "Advanced",
        content: {
          overview:
            "Wait for multiple channel operations simultaneously with select statements.",
          keyPoints: [
            "Wait for channels with multiple case statements",
            "Execute the first ready case",
            "Non-blocking with default clause",
          ],
          code: `package main

import (
    "fmt"
    "time"
)

func main() {
    pipe1 := make(chan string)
    pipe2 := make(chan string)
    
    go func() {
        time.Sleep(2 * time.Second)
        pipe1 <- "alpha"
    }()
    
    go func() {
        time.Sleep(3 * time.Second)
        pipe2 <- "beta"
    }()
    
    for count := 0; count < 2; count++ {
        select {
        case text1 := <-pipe1:
            fmt.Println(text1)
        case text2 := <-pipe2:
            fmt.Println(text2)
        }
    }
}`,
          output: "alpha\nbeta",
        },
      },
    },
  },
  advanced: {
    title: "Advanced",
    icon: "🎯",
    topics: {
      interfaces: {
        title: "Interfaces",
        description: "Abstraction and Polymorphism",
        level: "Intermediate",
        content: {
          overview: "Define type behavior with interfaces.",
          keyPoints: [
            "Define a set of methods",
            "Implicit implementation",
            "Duck typing",
          ],
          code: `package main

import "fmt"

type Geometry interface {
    Area() float64
}

type Round struct {
    Diameter float64
}

func (r Round) Area() float64 {
    return 3.14 * r.Diameter * r.Diameter
}

func main() {
    var g Geometry = Round{6}
    fmt.Printf("Area: %.2f\\n", g.Area())
}`,
          output: "Area: 113.04",
        },
      },
      errors: {
        title: "Error Handling",
        description: "Error Handling Patterns",
        level: "Intermediate",
        content: {
          overview: "Learn Go's error handling using the error type.",
          keyPoints: [
            "Return error type",
            "Error checking is mandatory",
            "Generate errors with errors.New()",
          ],
          code: `package main

import (
    "errors"
    "fmt"
)

func calculate(p, q float64) (float64, error) {
    if q == 0 {
        return 0, errors.New("division by zero")
    }
    return p / q, nil
}

func main() {
    answer, err := calculate(24, 4)
    if err != nil {
        fmt.Println("Error:", err)
    } else {
        fmt.Println("Result:", answer)
    }
}`,
          output: "Result: 6",
        },
      },
      generics: {
        title: "Generics",
        description: "Generalization with Type Parameters",
        level: "Advanced",
        content: {
          overview: "Write generic code using generics introduced in Go 1.18+.",
          keyPoints: [
            "Reusable code with type parameters",
            "Restrict types with constraints",
            "Reduce code duplication",
          ],
          code: `package main

import "fmt"

func Max[T int | float64](p, q T) T {
    if p > q {
        return p
    }
    return q
}

func main() {
    fmt.Println(Max(11, 19))
    fmt.Println(Max(8.7, 6.3))
}`,
          output: "19\n8.7",
        },
      },
    },
  },
};
