// app/data/content2.ts

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
export const content2: Content = {
  structs: {
    title: "Structs",
    icon: "🏗️",
    topics: {
      basicStructs: {
        title: "struct (Structs)",
        description: "Defining Custom Types with Structs",
        level: "Beginner",
        content: {
          overview:
            "Like C, structs define custom types. Fields starting with capital letters are exported (accessible from other packages), while lowercase fields are private.",
          keyPoints: [
            "Define with type Name struct { }",
            "Capital letter fields are exported",
            "Lowercase fields are package-private",
            "Initialize with struct literals",
          ],
          code: `package main

import "fmt"

type User struct {
    Name string
    Age  int
}

func main() {
    var user User
    user.Name = "Bob"
    user.Age = 18
    
    fmt.Println(user.Name, user.Age)
}`,
          output: "Bob 18",
        },
      },
      structLiterals: {
        title: "Struct Initialization",
        description: "Multiple Ways to Initialize Structs",
        level: "Beginner",
        content: {
          overview:
            "You can declare and initialize struct fields simultaneously. Both named and positional initialization are supported.",
          keyPoints: [
            'Named field initialization: User{Name: "Bob", Age: 18}',
            "Equivalent to separate declaration and assignment",
            "Can omit field names if values are in order",
          ],
          code: `package main

import "fmt"

type User struct {
    Name string
    Age  int
}

func main() {
    // Named initialization
    user := User{
        Name: "Bob",
        Age:  18,
    }
    
    fmt.Println(user.Name, user.Age)
}`,
          output: "Bob 18",
        },
      },
      structPointers: {
        title: "Struct Pointers",
        description: "Passing Structs by Reference",
        level: "Intermediate",
        content: {
          overview:
            "To avoid copying large structs, use pointers. The & operator gets the address, and pointers allow functions to modify the original struct.",
          keyPoints: [
            "Use & to get struct address",
            "Pointer receivers: func(user *User)",
            "Avoids copying large structs",
            "Enables modification of original data",
          ],
          code: `package main

import "fmt"

type User struct {
    Name string
    Age  int
}

func showName(user *User) {
    fmt.Println(user.Name)
}

func main() {
    user := User{
        Name: "Bob",
        Age:  18,
    }
    showName(&user)
}`,
          output: "Bob",
        },
      },
      methods: {
        title: "Methods",
        description: "Defining Methods on Types",
        level: "Intermediate",
        content: {
          overview:
            "Unlike C, Go supports methods. Before explaining methods, let's look at type definitions.",
          keyPoints: [
            "Syntax: type Name Type",
            "Define methods on custom types",
            "Cannot add methods to built-in types",
            "Receiver comes before function name",
          ],
          code: `package main

import "fmt"

type Value int

func (v Value) Add(n Value) Value {
    return v + n
}

func main() {
    v := Value(1)
    v = v.Add(2)
    fmt.Println(v)
}`,
          output: "3",
        },
      },
    },
  },
  pointers: {
    title: "Pointers",
    icon: "👉",
    topics: {
      basicPointers: {
        title: "Pointers",
        description: "Getting Pointers with & and Dereferencing with *",
        level: "Beginner",
        content: {
          overview:
            "Go supports pointers. Use & to get a pointer, and * to dereference and access the actual value.",
          keyPoints: [
            "Get address with & operator",
            "Dereference with * operator",
            "Assign values through pointers",
            "Access field references with .",
          ],
          code: `package main

import "fmt"

func main() {
    v := 1
    p := &v
    *p = 2
    fmt.Println(v) // 2 is displayed
}`,
          output: "2",
        },
      },
      newFunction: {
        title: "new Function",
        description: "Dynamic Struct Creation",
        level: "Intermediate",
        content: {
          overview:
            "When dynamically generating structs, you can use new. In the example of struct definitions shown earlier, the pointer was actually a pointer. In Go, pointers can be used for both struct field references and field references using .",
          keyPoints: [
            "new(User) creates pointer to User",
            "Dynamically allocates memory",
            "Returns pointer to zero-valued struct",
            "Use . for field access (not ->)",
          ],
          code: `package main

import "fmt"

type User struct {
    Name string
    Age  int
}

func main() {
    user := new(User)
    user.Name = "Bob"
    user.Age = 18
    
    fmt.Println(user.Name, user.Age)
}`,
          output: "Bob 18",
        },
      },
      valueVsPointerReceivers: {
        title: "Value vs Pointer Receivers",
        description: "Modifying Self with Pointer Receivers",
        level: "Intermediate",
        content: {
          overview:
            "To modify self in the Add method of the Value type shown earlier, implement it as follows.",
          keyPoints: [
            "Pointer receivers: func (v *Value)",
            "Can modify the receiver",
            "Value receivers create copies",
            "Pointer receivers avoid copying",
          ],
          code: `package main

import "fmt"

type Value int

func (v *Value) Add(n Value) {
    *v += n // Dereference receiver to assign
}

func main() {
    v := Value(1)
    v.Add(2)
    fmt.Println(v) // 3 is displayed
}`,
          output: "3",
        },
      },
      escapeAnalysis: {
        title: "Escape Analysis",
        description: "Returning Pointers from Functions",
        level: "Advanced",
        content: {
          overview:
            "In C, when returning a pointer to a variable inside a function as the return value, the program crashes. However, in Go, if a pointer is returned outside the function, it is switched from the stack to the heap. This is called escape analysis.",
          keyPoints: [
            "Go performs escape analysis",
            "Local variables can escape to heap",
            "Safe to return pointers from functions",
            "Automatic memory management",
          ],
          code: `package main

import "fmt"

type User struct {
    Name string
    Age  int
}

func Bob() *User {
    user := User{
        Name: "Bob",
        Age:  18,
    }
    return &user
}

func main() {
    u := Bob()
    fmt.Println(u.Name)
}`,
          output: "Bob",
        },
      },
    },
  },
  types: {
    title: "Type System",
    icon: "🔤",
    topics: {
      typeDeclaration: {
        title: "type (Type Declaration)",
        description: "Creating Named Types",
        level: "Beginner",
        content: {
          overview:
            "You can give names to types using type. The new type can be used like the original type.",
          keyPoints: [
            "Define with type Name UnderlyingType",
            "Creates a distinct type",
            "MyString behaves like string",
            "Requires explicit conversion",
          ],
          code: `package main

import "fmt"

type MyString string

func main() {
    var m MyString
    m = "foo"
    fmt.Println(m)
}`,
          output: "foo",
        },
      },
      typeConversion: {
        title: "Type Conversion",
        description: "Converting Between Types",
        level: "Beginner",
        content: {
          overview:
            "To convert back to the original string type, perform a type conversion.",
          keyPoints: [
            "Convert with TypeName(value)",
            "Required for custom types",
            "Explicit conversion needed",
            "No implicit conversion",
          ],
          code: `package main

import "fmt"

type MyString string

func main() {
    var m MyString
    m = "foo"
    s := string(m)
    fmt.Println(s)
}`,
          output: "foo",
        },
      },
    },
  },
  mapsAdvanced: {
    title: "Maps Advanced",
    icon: "🗺️",
    topics: {
      zeroValues: {
        title: "Map Zero Values",
        description: "Accessing Non-existent Keys",
        level: "Beginner",
        content: {
          overview:
            "When specifying a non-existent key in a map, the zero value of the value type is returned.",
          keyPoints: [
            "Non-existent keys return zero value",
            "Empty string for string type",
            "0 for numeric types",
            "nil for pointer types",
          ],
          code: `package main

import "fmt"

func main() {
    m := map[string]string{
        "foo": "bar",
    }
    fmt.Println(m["zoo"]) // Empty string displayed
}`,
          output: "",
        },
      },
      existenceCheck: {
        title: "Key Existence Check",
        description: "Checking if Keys Exist",
        level: "Beginner",
        content: {
          overview:
            "To check if a key exists, receive two values. The second value indicates existence.",
          keyPoints: [
            "Syntax: v, ok := m[key]",
            "ok is true if key exists",
            "ok is false if key doesn't exist",
            "Comma ok idiom",
          ],
          code: `package main

import "fmt"

func main() {
    m := map[string]string{
        "foo": "bar",
    }
    
    v, ok := m["zoo"]
    if ok {
        fmt.Println(v)
    } else {
        fmt.Println("Key not found")
    }
}`,
          output: "Key not found",
        },
      },
    },
  },
  constructors: {
    title: "Constructors",
    icon: "🏭",
    topics: {
      constructorPattern: {
        title: "Constructor Pattern",
        description: "Creating Initialization Functions",
        level: "Intermediate",
        content: {
          overview:
            "Go does not have constructors like C++ or Java. When initializing a struct and wanting to return a pointer to that struct, it's customary in Go to use New as the function name.",
          keyPoints: [
            "No built-in constructors in Go",
            "Convention: NewTypeName functions",
            "Return pointers for initialization",
            "Go compiler specially handles New",
          ],
          code: `package main

import "fmt"

type User struct {
    Name string
    Age  int
}

func NewUser(name string, age int) *User {
    return &User{
        Name: name,
        Age:  age,
    }
}

func main() {
    user := NewUser("Bob", 18)
    fmt.Println(user.Name, user.Age)
}`,
          output: "Bob 18",
        },
      },
    },
  },
  interfaces: {
    title: "Interfaces",
    icon: "🔌",
    topics: {
      interfaceBasics: {
        title: "Interface Basics",
        description: "Defining Method Sets",
        level: "Intermediate",
        content: {
          overview:
            "While struct holds actual data, interface can define an interface for types with methods.",
          keyPoints: [
            "Define method signatures",
            "Implicit implementation (no 'implements' keyword)",
            "Duck typing in Go",
            "Any type with matching methods satisfies interface",
          ],
          code: `package main

import "fmt"

type Speaker interface {
    Speak() error
}

type Dog struct {}

func (d *Dog) Speak() error {
    fmt.Println("BowWow")
    return nil
}

type Cat struct {}

func (c *Cat) Speak() error {
    fmt.Println("Meow")
    return nil
}

func main() {
    var s Speaker
    s = &Dog{}
    s.Speak()
    
    s = &Cat{}
    s.Speak()
}`,
          output: "BowWow\nMeow",
        },
      },
      interfacePolymorphism: {
        title: "Polymorphism with Interfaces",
        description: "Using Interfaces as Parameters",
        level: "Intermediate",
        content: {
          overview:
            "Types Dog and Cat with the Speak method can be substituted as variables of the Speaker type.",
          keyPoints: [
            "Pass any type implementing interface",
            "Polymorphic function parameters",
            "Type-safe abstraction",
            "No inheritance needed",
          ],
          code: `package main

import "fmt"

type Speaker interface {
    Speak() error
}

type Dog struct {}

func (d *Dog) Speak() error {
    fmt.Println("BowWow")
    return nil
}

type Cat struct {}

func (c *Cat) Speak() error {
    fmt.Println("Meow")
    return nil
}

func DoSpeak(s Speaker) error {
    return s.Speak()
}

func main() {
    dog := Dog{}
    DoSpeak(&dog)
    
    cat := Cat{}
    DoSpeak(&cat)
}`,
          output: "BowWow\nMeow",
        },
      },
      duckTyping: {
        title: "Duck Typing",
        description: "Implicit Interface Implementation",
        level: "Intermediate",
        content: {
          overview:
            "Even if Dog has another method in addition, there is no problem. In Go, the type itself implements the interface Speaker by having a design that adopts it. This is called duck typing.",
          keyPoints: [
            "No explicit 'implements' declaration",
            "If it walks like a duck and quacks like a duck...",
            "More methods than interface = still valid",
            "interface{} has zero methods = accepts all types",
          ],
          code: `package main

import "fmt"

type Speaker interface {
    Speak() error
}

type Dog struct {
    Name string
}

func (d *Dog) Speak() error {
    fmt.Println("BowWow")
    return nil
}

func (d *Dog) Run() {
    fmt.Println(d.Name, "is running")
}

func main() {
    var s Speaker = &Dog{Name: "Buddy"}
    s.Speak()
}`,
          output: "BowWow",
        },
      },
    },
  },
  interfaceType: {
    title: "interface{} and any",
    icon: "🔀",
    topics: {
      interfaceBasics: {
        title: "interface{} or any",
        description: "Storing Any Type of Value",
        level: "Intermediate",
        content: {
          overview:
            "Go has the interface{} type that can store values of any type.",
          keyPoints: [
            "interface{} accepts any type",
            "any is alias for interface{} (Go 1.18+)",
            "Used for generic containers",
            "Requires type assertion to use",
          ],
          code: `package main

import "fmt"

func main() {
    var v interface{}
    v = 1
    v = "こんにちは世界"
    
    fmt.Println(v)
}`,
          output: "こんにちは世界",
        },
      },
      typeAssertion: {
        title: "Type Assertion",
        description: "Extracting Values from interface{}",
        level: "Intermediate",
        content: {
          overview:
            "To extract a value from an interface{} variable and return it to its original type, you need to perform a type assertion.",
          keyPoints: [
            "Syntax: value := v.(Type)",
            "Panics if wrong type",
            "Safe form: value, ok := v.(Type)",
            "Check ok before using value",
          ],
          code: `package main

import "fmt"

func main() {
    var v interface{}
    
    v = 1
    n := v.(int)
    
    v = "こんにちは世界"
    s := v.(string)
    
    fmt.Println(n, s)
}`,
          output: "1 こんにちは世界",
        },
      },
      safeTypeAssertion: {
        title: "Safe Type Assertion",
        description: "Checking Type Assertion Success",
        level: "Intermediate",
        content: {
          overview:
            "Type assertion with the wrong type causes a panic. To verify that the correct type assertion is performed, execute as follows:",
          keyPoints: [
            "Use comma ok idiom: v, ok := x.(T)",
            "ok is true if assertion succeeds",
            "ok is false if assertion fails",
            "Prevents panics",
          ],
          code: `package main

import "fmt"

func main() {
    var v interface{} = 1
    
    s, ok := v.(string)
    if !ok {
        fmt.Println("v is not string")
    } else {
        fmt.Printf("v is string %q\\n", s)
    }
}`,
          output: "v is not string",
        },
      },
      typeSwitch: {
        title: "Type Switch",
        description: "Handling Multiple Types",
        level: "Advanced",
        content: {
          overview:
            "To implement a function that can accept any value and handle multiple types, you can use a type switch.",
          keyPoints: [
            "Syntax: switch t := v.(type)",
            "Handle different types in cases",
            "Can group multiple types",
            "Use default for unknown types",
          ],
          code: `package main

import "fmt"

func PrintDetail(v interface{}) {
    switch t := v.(type) {
    case int, int32, int64:
        fmt.Println("int/int32/int64 type:", t)
    case string:
        fmt.Println("string type:", t)
    default:
        fmt.Println("unknown type")
    }
}

func main() {
    PrintDetail(42)
    PrintDetail("hello")
    PrintDetail(3.14)
}`,
          output: "int/int32/int64 type: 42\nstring type: hello\nunknown type",
        },
      },
      typeSwitchLimitation: {
        title: "Type Switch with reflect",
        description: "Handling Custom Types",
        level: "Advanced",
        content: {
          overview:
            "However, this type switch cannot handle other types (underlying types) defined with type. To handle custom types, use the reflect package.",
          keyPoints: [
            "Type switch checks concrete types",
            "Use reflect.TypeOf() for custom types",
            "reflect.Kind() gets underlying type",
            "More flexible but slower",
          ],
          code: `package main

import (
    "fmt"
    "reflect"
)

type V int

func PrintDetail(v interface{}) {
    rt := reflect.TypeOf(v)
    switch rt.Kind() {
    case reflect.Int, reflect.Int32, reflect.Int64:
        fmt.Println("int/int32/int64 type:", v)
    case reflect.String:
        fmt.Println("string type:", v)
    default:
        fmt.Println("unknown type")
    }
}

func main() {
    var v V = 123
    PrintDetail(v)
}`,
          output: "int/int32/int64 type: 123",
        },
      },
    },
  },
  defer: {
    title: "defer",
    icon: "🔚",
    topics: {
      deferBasics: {
        title: "defer Statement",
        description: "Deferring Function Execution",
        level: "Intermediate",
        content: {
          overview:
            "defer can defer processing. In Go, post-processing is done by declaring with defer what to do when closing a function.",
          keyPoints: [
            "Defers execution until function returns",
            "Commonly used for cleanup",
            "Guaranteed to execute even on panic",
            "Arguments evaluated immediately",
          ],
          code: `package main

import (
    "fmt"
    "log"
    "os"
)

func main() {
    f, err := os.Open("data.txt")
    if err != nil {
        log.Fatal(err)
    }
    defer f.Close()
    
    var b [512]byte
    n, err := f.Read(b[:])
    if err != nil {
        log.Fatal(err)
    }
    fmt.Println(string(b[:n]))
}`,
          output: "File contents...",
        },
      },
      deferOrder: {
        title: "defer Execution Order",
        description: "LIFO (Last In, First Out)",
        level: "Intermediate",
        content: {
          overview:
            "When executing this example, f is written above but both are captured at defer specification time. Also, defer is executed in reverse order of specification.",
          keyPoints: [
            "Multiple defers execute in LIFO order",
            "Last deferred function runs first",
            "Stack-like behavior",
            "Useful for nested resource cleanup",
          ],
          code: `package main

import "fmt"

func main() {
    defer fmt.Println("6")
    defer fmt.Println("5")
    defer fmt.Println("4")
    fmt.Println("1")
    fmt.Println("2")
    fmt.Println("3")
}`,
          output: "1\n2\n3\n4\n5\n6",
        },
      },
      deferCleanup: {
        title: "defer for Cleanup",
        description: "Resource Management with defer",
        level: "Advanced",
        content: {
          overview:
            "For example, if this source code is executed, 1 through 6 are displayed in order. Therefore, it becomes simple to implement post-processing such as creating a directory and performing processing, then closing the file and deleting the directory.",
          keyPoints: [
            "Cleanup guaranteed even on early return",
            "Cleanup guaranteed even on error",
            "Close files, unlock mutexes, delete temp files",
            "Makes error handling cleaner",
          ],
          code: `package main

import (
    "os"
    "path/filepath"
)

func doSomething(dir string) error {
    err := os.Mkdir(dir, 0755)
    if err != nil {
        return err
    }
    defer os.RemoveAll(dir)
    
    f, err := os.Create(filepath.Join(dir, "data.txt"))
    if err != nil {
        return err
    }
    defer f.Close()
    
    // Process using file
    return nil
}

func main() {
    doSomething("tempdir")
}`,
          output: "",
        },
      },
      deferInLoop: {
        title: "defer in Loops",
        description: "Avoiding Resource Leaks in Loops",
        level: "Advanced",
        content: {
          overview:
            "defer is not executed per loop iteration. It is executed when all functions finish.",
          keyPoints: [
            "defer executes when function returns, not per iteration",
            "Can cause resource leaks in loops",
            "Wrap in anonymous function if needed",
            "Use defer carefully in long-running loops",
          ],
          code: `package main

import (
    "log"
    "os"
)

func main() {
    for i := 0; i < 100; i++ {
        f, err := os.Open("data.txt")
        if err != nil {
            return
        }
        defer f.Close()
        
        // do something
    }
}`,
          output: "// File handles accumulate until function returns",
        },
      },
      deferWithAnonymousFunction: {
        title: "defer with Anonymous Function",
        description: "Capturing Variables Correctly",
        level: "Advanced",
        content: {
          overview:
            "Also, you can pass anonymous functions to defer. Variables are captured at defer time.",
          keyPoints: [
            "Pass anonymous functions to defer",
            "Variables captured by reference",
            "Deferred function sees final value",
            "Use function parameters to capture current value",
          ],
          code: `package main

import "fmt"

func doSomething() {
    var n = 1
    defer func() {
        fmt.Println(n)
    }()
    
    n = 2
}

func main() {
    doSomething()
}`,
          output: "2",
        },
      },
      deferWithNormalFunction: {
        title: "defer with Normal Function",
        description: "Arguments Evaluated Immediately",
        level: "Advanced",
        content: {
          overview:
            "In contrast, when deferring a normal function call, arguments are evaluated immediately.",
          keyPoints: [
            "Function arguments evaluated immediately",
            "Deferred call uses captured value",
            "Different from anonymous function closure",
            "Output is 1, not 2",
          ],
          code: `package main

import "fmt"

func doSomething() {
    var n = 1
    defer fmt.Println(n)
    
    n = 2
}

func main() {
    doSomething()
}`,
          output: "1",
        },
      },
    },
  },
  goroutinesAdvanced: {
    title: "Goroutines",
    icon: "🚀",
    topics: {
      goroutineBasics: {
        title: "goroutines",
        description: "Lightweight Concurrent Threads",
        level: "Intermediate",
        content: {
          overview:
            "One of Go's characteristic features is goroutine. Goroutine is a lightweight thread managed by Go's runtime.",
          keyPoints: [
            "Start with go keyword",
            "Lightweight and efficient",
            "Thousands can run simultaneously",
            "Managed by Go runtime",
          ],
          code: `package main

import "fmt"

func sendMessage(message string) {
    fmt.Println(message)
}

func main() {
    message := "hi"
    go sendMessage(message)
}`,
          output: "hi",
        },
      },
      goroutineArguments: {
        title: "Goroutine Arguments",
        description: "Argument Capture Behavior",
        level: "Intermediate",
        content: {
          overview:
            "To execute a goroutine, just add go before the function call. goroutine is executed against the function call, and arguments are captured at the time of call.",
          keyPoints: [
            "Arguments captured at go statement",
            "Changes after go don't affect goroutine",
            "Pass by value semantics",
            "Use channels for communication",
          ],
          code: `package main

import (
    "fmt"
    "time"
)

func sendMessage(message string) {
    fmt.Println(message)
}

func main() {
    message := "hi"
    go sendMessage(message)
    message = "ho"
    
    time.Sleep(time.Second)
}`,
          output: "hi",
        },
      },
      raceCondition: {
        title: "Race Condition",
        description: "Data Race Detection",
        level: "Advanced",
        content: {
          overview:
            "However, when using anonymous functions, there is a possibility that rewriting may occur first depending on the timing. This is called a race condition.",
          keyPoints: [
            "Anonymous functions can capture variables",
            "Timing issues can cause data races",
            "Use go build -race to detect",
            "WARNING: DATA RACE message appears",
          ],
          code: `package main

import (
    "fmt"
    "time"
)

func sendMessage(msg string) {
    fmt.Println(msg)
}

func main() {
    message := "hi"
    go func() {
        sendMessage(message)
    }()
    message = "ho"
    
    time.Sleep(time.Second)
}`,
          output: "ho",
        },
      },
      syncWaitGroup: {
        title: "sync.WaitGroup",
        description: "Waiting for Goroutines",
        level: "Intermediate",
        content: {
          overview:
            "Conversely, goroutines continue to run even inside functions. To wait for goroutines to finish, you need to use the sync package.",
          keyPoints: [
            "Coordinate goroutine completion",
            "wg.Add(1) increments counter",
            "wg.Done() decrements counter",
            "wg.Wait() blocks until counter is 0",
          ],
          code: `package main

import (
    "fmt"
    "sync"
)

func main() {
    var wg sync.WaitGroup
    wg.Add(1)
    go func() {
        defer wg.Done()
        fmt.Println("Goroutine executed")
    }()
    
    wg.Wait()
    fmt.Println("All done")
}`,
          output: "Goroutine executed\nAll done",
        },
      },
      goroutineBenefits: {
        title: "Goroutine Benefits",
        description: "Parallel Processing Advantages",
        level: "Intermediate",
        content: {
          overview:
            "In this way, heavy processing can be executed in parallel using goroutine. The advantage of parallel processing is that you can execute other processing during times when the CPU is not being used.",
          keyPoints: [
            "Utilize CPU during I/O waits",
            "Scale to thousands of goroutines",
            "Better than traditional threads",
            "Go runtime manages scheduling",
          ],
          code: `package main

import (
    "fmt"
    "sync"
    "time"
)

func worker(id int, wg *sync.WaitGroup) {
    defer wg.Done()
    fmt.Printf("Worker %d starting\\n", id)
    time.Sleep(time.Second)
    fmt.Printf("Worker %d done\\n", id)
}

func main() {
    var wg sync.WaitGroup
    
    for i := 1; i <= 5; i++ {
        wg.Add(1)
        go worker(i, &wg)
    }
    
    wg.Wait()
}`,
          output:
            "Worker 1 starting\nWorker 2 starting\nWorker 3 starting\nWorker 4 starting\nWorker 5 starting\nWorker 1 done\nWorker 2 done\nWorker 3 done\nWorker 4 done\nWorker 5 done",
        },
      },
      goroutineLoopCapture: {
        title: "Goroutine Loop Variable Capture",
        description: "Correctly Capturing Loop Variables",
        level: "Advanced",
        content: {
          overview:
            "Note that care is required when using goroutines inside loops. To avoid issues, you need to declare a new variable inside the loop scope.",
          keyPoints: [
            "Loop variables shared across iterations",
            "Create new variable in loop scope",
            "Use v := i pattern",
            "Or pass as function parameter",
          ],
          code: `package main

import (
    "fmt"
    "sync"
)

func main() {
    var wg sync.WaitGroup
    for i := 0; i < 10; i++ {
        v := i
        wg.Add(1)
        go func() {
            defer wg.Done()
            fmt.Println(v)
        }()
    }
    
    wg.Wait()
}`,
          output: "0\n1\n5\n3\n4\n9\n7\n8\n6\n2",
        },
      },
      syncMutex: {
        title: "sync.Mutex",
        description: "Mutual Exclusion Lock",
        level: "Advanced",
        content: {
          overview:
            "Care is also required when referencing and updating the same variable from goroutine caller and inside goroutine. To protect data, you need to use sync.Mutex.",
          keyPoints: [
            "Protect shared data with mutex",
            "mu.Lock() before accessing",
            "mu.Unlock() after accessing",
            "Prevents race conditions",
          ],
          code: `package main

import (
    "fmt"
    "sync"
)

func main() {
    n := 0
    var mu sync.Mutex
    var wg sync.WaitGroup
    wg.Add(2)
    
    go func() {
        defer wg.Done()
        for i := 0; i < 1000; i++ {
            mu.Lock()
            n++
            mu.Unlock()
        }
    }()
    
    go func() {
        defer wg.Done()
        for i := 0; i < 1000; i++ {
            mu.Lock()
            n++
            mu.Unlock()
        }
    }()
    
    wg.Wait()
    fmt.Println(n)
}`,
          output: "2000",
        },
      },
      channels: {
        title: "channel (Channels)",
        description: "Communication Between Goroutines",
        level: "Intermediate",
        content: {
          overview:
            "channel allows you to send and receive data to and from goroutines.",
          keyPoints: [
            "Create channels with make(chan Type)",
            "Send data with ch <-",
            "Receive data with <- ch",
            "Close with close(ch)",
          ],
          code: `package main

import "fmt"

func server(ch chan string) {
    defer close(ch)
    ch <- "one"
    ch <- "two"
    ch <- "three"
}

func main() {
    ch := make(chan string)
    go server(ch)
    
    for s := range ch {
        fmt.Println(s)
    }
}`,
          output: "one\ntwo\nthree",
        },
      },
      channelsPractical: {
        title: "Practical Goroutine and Channel Example",
        description: "Concurrent HTTP Downloads",
        level: "Advanced",
        content: {
          overview:
            "By using goroutine and channel, you can easily implement concurrent processing. The main function receives downloaded content from goroutines sequentially.",
          keyPoints: [
            "Parallel HTTP downloads with goroutines",
            "Channel for passing downloaded content",
            "Main function receives and processes",
            "Efficient use of CPU during I/O",
          ],
          code: `package main

import (
    "fmt"
    "io"
    "log"
    "net/http"
    "sync"
)

func downloadCSV(wg *sync.WaitGroup, urls []string, ch chan []byte) {
    defer wg.Done()
    defer close(ch)
    
    for _, u := range urls {
        resp, err := http.Get(u)
        if err != nil {
            log.Println("Error:", err)
            continue
        }
        
        b, err := io.ReadAll(resp.Body)
        resp.Body.Close()
        if err != nil {
            log.Println("Error:", err)
            continue
        }
        
        ch <- b
    }
}

func main() {
    urls := []string{
        "http://example.com/data1.csv",
        "http://example.com/data2.csv",
    }
    
    ch := make(chan []byte)
    var wg sync.WaitGroup
    wg.Add(1)
    go downloadCSV(&wg, urls, ch)
    
    for data := range ch {
        fmt.Println("Received", len(data), "bytes")
    }
    
    wg.Wait()
}`,
          output: "Received 1234 bytes\nReceived 5678 bytes",
        },
      },
      bufferedChannels: {
        title: "Buffered Channels",
        description: "Non-blocking Sends with Buffers",
        level: "Advanced",
        content: {
          overview:
            "You can have the channel hold a buffer. A channel with a buffer will not block until the buffer is full.",
          keyPoints: [
            "Create with make(chan Type, size)",
            "Sends don't block until buffer full",
            "Receives don't block while buffer has data",
            "Use for performance tuning",
          ],
          code: `package main

import "fmt"

func main() {
    ch := make(chan string, 5)
    
    ch <- "one"
    ch <- "two"
    ch <- "three"
    ch <- "four"
    ch <- "five"
    
    fmt.Println(<-ch)
    fmt.Println(<-ch)
}`,
          output: "one\ntwo",
        },
      },
      selectStatement: {
        title: "Control Structure (select)",
        description: "Multiplexing Channel Operations",
        level: "Advanced",
        content: {
          overview:
            "Go has a similar structure called select statement. Use select when you want to wait for multiple channels.",
          keyPoints: [
            "Wait on multiple channels",
            "Execute first ready case",
            "Similar syntax to switch",
            "Use default for non-blocking",
          ],
          code: `package main

import (
    "fmt"
    "time"
)

func main() {
    ch1 := make(chan string)
    ch2 := make(chan string)
    
    go func() {
        time.Sleep(1 * time.Second)
        ch1 <- "from ch1"
    }()
    
    go func() {
        time.Sleep(2 * time.Second)
        ch2 <- "from ch2"
    }()
    
    select {
    case v1 := <-ch1:
        fmt.Println(v1)
    case v2 := <-ch2:
        fmt.Println(v2)
    }
}`,
          output: "from ch1",
        },
      },
      selectWithDefault: {
        title: "select with default",
        description: "Non-blocking Channel Operations",
        level: "Advanced",
        content: {
          overview:
            "By writing default, you can implement processing even when there is no data in the channel. In this case, it is not blocked.",
          keyPoints: [
            "default case executes immediately",
            "No blocking occurs",
            "Useful for polling",
            "Check channel without waiting",
          ],
          code: `package main

import (
    "fmt"
    "time"
)

func main() {
    ch := make(chan string)
    
    go func() {
        time.Sleep(2 * time.Second)
        ch <- "data"
    }()
    
    select {
    case v := <-ch:
        fmt.Println("Received:", v)
    default:
        fmt.Println("No data yet")
    }
    
    time.Sleep(3 * time.Second)
    fmt.Println(<-ch)
}`,
          output: "No data yet\ndata",
        },
      },
    },
  },
  modules: {
    title: "Go Modules",
    icon: "📦",
    topics: {
      moduleBasics: {
        title: "What are Go Modules?",
        description: "Dependency Management System",
        level: "Intermediate",
        content: {
          overview:
            "Go modules are a 'mechanism for managing dependencies' composed of multiple packages.",
          keyPoints: [
            "go.mod manages dependencies",
            "module directive declares module name",
            "go directive specifies Go version",
            "require lists dependencies",
          ],
          code: `module my-app

go 1.20`,
          output: "",
        },
      },
      goGet: {
        title: "go get Command",
        description: "Installing External Packages",
        level: "Intermediate",
        content: {
          overview: "Use go get to download packages and update go.mod.",
          keyPoints: [
            "go get downloads packages",
            "Updates go.mod automatically",
            "Can specify version: @v0.0.12",
            "Downloads transitive dependencies",
          ],
          code: `$ go get github.com/mattn/go-runewidth

// go.mod is updated:
module my-app

go 1.20

require (
    github.com/mattn/go-runewidth v0.0.13 // indirect
    github.com/rivo/uniseg v0.2.0 // indirect
)`,
          output: "",
        },
      },
      goModTidy: {
        title: "go mod tidy",
        description: "Cleaning Up Dependencies",
        level: "Intermediate",
        content: {
          overview:
            "Use go mod tidy to add missing dependencies and remove unused ones.",
          keyPoints: [
            "Removes unused dependencies",
            "Adds missing dependencies",
            "Updates go.mod and go.sum",
            "Run after changing imports",
          ],
          code: `$ go mod tidy`,
          output: "",
        },
      },
      goModVendor: {
        title: "go mod vendor",
        description: "Vendoring Dependencies",
        level: "Advanced",
        content: {
          overview:
            "Use go mod vendor to copy all dependencies to a vendor/ directory for offline builds.",
          keyPoints: [
            "Copies dependencies to vendor/",
            "Enables offline builds",
            "Local patches possible",
            "Run go mod vendor to update",
          ],
          code: `$ go mod vendor`,
          output: "",
        },
      },
    },
  },
  stdlib: {
    title: "Standard Library",
    icon: "📚",
    topics: {
      json: {
        title: "JSON Encoding",
        description: "Working with JSON Data",
        level: "Intermediate",
        content: {
          overview:
            "Use the encoding/json package to serialize structs to JSON.",
          keyPoints: [
            "Use json.Marshal() to encode",
            "Use json.Unmarshal() to decode",
            "Struct tags control field names",
            "Omit empty fields with omitempty",
          ],
          code: `package main

import (
    "encoding/json"
    "fmt"
)

type User struct {
    Name string \`json:"name"\`
    Age  int    \`json:"age"\`
}

func main() {
    user := User{Name: "Alice", Age: 25}
    data, _ := json.Marshal(user)
    fmt.Println(string(data))
}`,
          output: '{"name":"Alice","age":25}',
        },
      },
      time: {
        title: "Time Package",
        description: "Working with Dates and Times",
        level: "Intermediate",
        content: {
          overview:
            "The time package provides functionality for measuring and displaying time.",
          keyPoints: [
            "time.Now() gets current time",
            "time.Sleep() pauses execution",
            "Format with time.Format()",
            "Parse with time.Parse()",
          ],
          code: `package main

import (
    "fmt"
    "time"
)

func main() {
    now := time.Now()
    fmt.Println("Current time:", now)
    
    formatted := now.Format("2006-01-02 15:04:05")
    fmt.Println("Formatted:", formatted)
}`,
          output:
            "Current time: 2025-10-09 14:30:00\nFormatted: 2025-10-09 14:30:00",
        },
      },
    },
  },
};
