const fs = require('fs');
const path = require('path');

function generateDsaQuizzes() {
    const quizzes = [];
    
    // 1. Complexity Analysis
    quizzes.push({
        title: "Complexity Analysis & Big O",
        questions: [
            {q: "What is the worst-case search complexity of a binary search tree?", o: ["O(1)", "O(log N)", "O(N)", "O(N^2)"], a: 2},
            {q: "What is the average-case search complexity of a binary search tree?", o: ["O(1)", "O(log N)", "O(N)", "O(N^2)"], a: 1},
            {q: "What is the time complexity of lookup in an Array by index?", o: ["O(1)", "O(log N)", "O(N)", "O(N log N)"], a: 0},
            {q: "What is the time complexity of searching in a sorted Array using Binary Search?", o: ["O(1)", "O(log N)", "O(N)", "O(N log N)"], a: 1},
            {q: "Which complexity class represents exponential growth?", o: ["O(N log N)", "O(N^2)", "O(2^N)", "O(N!)"], a: 2},
            {q: "What is the time complexity of inserting at the head of a Singly Linked List?", o: ["O(1)", "O(log N)", "O(N)", "O(N log N)"], a: 0},
            {q: "What is the time complexity of inserting at the tail of a Singly Linked List (without tail pointer)?", o: ["O(1)", "O(log N)", "O(N)", "O(N^2)"], a: 2},
            {q: "What is the time complexity of inserting at the tail of a Doubly Linked List with a tail pointer?", o: ["O(1)", "O(log N)", "O(N)", "O(N^2)"], a: 0},
            {q: "What does Big O notation describe?", o: ["Upper bound of running time", "Lower bound of running time", "Tight bound of running time", "Average running time"], a: 0},
            {q: "What is the time complexity of a simple nested loop where both run from 0 to N?", o: ["O(N)", "O(N log N)", "O(N^2)", "O(2^N)"], a: 2}
        ]
    });
    
    // 2. Arrays & Linked Lists
    quizzes.push({
        title: "Arrays & Linked Lists Operations",
        questions: [
            {q: "Which data structure stores elements in contiguous memory locations?", o: ["Linked List", "Array", "Stack", "Queue"], a: 1},
            {q: "How much memory does a pointer require in a 64-bit system?", o: ["2 bytes", "4 bytes", "8 bytes", "16 bytes"], a: 2},
            {q: "What is a major disadvantage of standard Arrays?", o: ["Slow index access", "Fixed size allocation", "High pointer overhead", "Lack of cache locality"], a: 1},
            {q: "In a Doubly Linked List, each node contains how many pointer fields?", o: ["0", "1", "2", "3"], a: 2},
            {q: "Which linked list has no NULL pointers?", o: ["Singly Linked List", "Doubly Linked List", "Circular Linked List", "Header Linked List"], a: 2},
            {q: "What is the time complexity to reverse a Singly Linked List of size N?", o: ["O(1)", "O(log N)", "O(N)", "O(N log N)"], a: 2},
            {q: "What is the space complexity of reversing a linked list in-place?", o: ["O(1)", "O(log N)", "O(N)", "O(N^2)"], a: 0},
            {q: "Which data structure is best suited for cache-friendly element traversal?", o: ["Linked List", "Array", "Binary Tree", "Hash Table"], a: 1},
            {q: "What happens during an array resize operation in dynamic arrays (like vectors)?", o: ["Elements are shifted in-place", "A new larger array is allocated and elements are copied", "Memory is freed automatically", "The array becomes a linked list"], a: 1},
            {q: "What is the amortized time complexity of push back on a dynamic array?", o: ["O(1)", "O(log N)", "O(N)", "O(N^2)"], a: 0}
        ]
    });

    // 3. Stacks & Queues
    quizzes.push({
        title: "Stacks & Queues (LIFO & FIFO)",
        questions: [
            {q: "Which principle does a Stack follow?", o: ["FIFO", "LIFO", "LILO", "None of these"], a: 1},
            {q: "Which principle does a Queue follow?", o: ["FIFO", "LIFO", "FILO", "None of these"], a: 0},
            {q: "What is the time complexity of push and pop operations on a stack?", o: ["O(1)", "O(log N)", "O(N)", "O(N log N)"], a: 0},
            {q: "Which of the following is a application of a Stack?", o: ["CPU Scheduling", "Function call management", "Print spooling", "Breadth-First Search"], a: 1},
            {q: "Which of the following is a application of a Queue?", o: ["Depth-First Search", "Undo/Redo history", "Breadth-First Search", "Expression evaluation"], a: 2},
            {q: "What is a Deque?", o: ["A double-ended queue", "A sorted queue", "A queue with priority", "A stack implemented with arrays"], a: 0},
            {q: "How many stacks are needed to implement a queue?", o: ["1", "2", "3", "4"], a: 1},
            {q: "What condition occurs when attempting to pop from an empty stack?", o: ["Overflow", "Underflow", "Segmentation Fault", "NullPointer"], a: 1},
            {q: "What is the time complexity of enqueuing and dequeuing in a standard queue?", o: ["O(1)", "O(log N)", "O(N)", "O(N log N)"], a: 0},
            {q: "Which queue allows elements to be inserted or deleted based on value or key?", o: ["Circular Queue", "Double Ended Queue", "Priority Queue", "Simple Queue"], a: 2}
        ]
    });

    // 4. Tree Fundamentals
    quizzes.push({
        title: "Tree Structures & Traversals",
        questions: [
            {q: "Which traversal visits nodes in: Left, Root, Right order?", o: ["Preorder", "Inorder", "Postorder", "Level-order"], a: 1},
            {q: "Which traversal visits nodes in: Root, Left, Right order?", o: ["Preorder", "Inorder", "Postorder", "Level-order"], a: 0},
            {q: "Which traversal visits nodes in: Left, Right, Root order?", o: ["Preorder", "Inorder", "Postorder", "Level-order"], a: 2},
            {q: "For a binary search tree (BST), which traversal visits nodes in sorted ascending order?", o: ["Preorder", "Inorder", "Postorder", "Level-order"], a: 1},
            {q: "What is the maximum number of nodes in a binary tree of height H (root at height 0)?", o: ["2^H", "2^(H+1) - 1", "2^H - 1", "H^2"], a: 1},
            {q: "What is the degree of a leaf node in a tree?", o: ["0", "1", "2", "Depends on height"], a: 0},
            {q: "Which tree traversal uses a Queue data structure?", "o": ["DFS", "Preorder", "Postorder", "Level-order (BFS)"], a: 3},
            {q: "In a full binary tree, if there are L leaf nodes, how many internal nodes are there?", o: ["L - 1", "L", "L + 1", "2L"], a: 0},
            {q: "What is the depth of the root node?", o: ["0", "1", "-1", "Depends on children"], a: 0},
            {q: "What is a binary tree where every node has either 0 or 2 children called?", o: ["Complete Binary Tree", "Full Binary Tree", "Perfect Binary Tree", "Balanced Binary Tree"], a: 1}
        ]
    });

    // 5. Advanced Trees
    quizzes.push({
        title: "Balanced & Advanced Trees",
        questions: [
            {q: "What is the maximum height difference allowed between left and right subtrees in an AVL tree?", o: ["0", "1", "2", "3"], a: 1},
            {q: "Which tree is a self-balancing binary search tree where each node is colored red or black?", o: ["AVL Tree", "B-Tree", "Red-Black Tree", "Splay Tree"], a: 2},
            {q: "What is the worst-case height of a Red-Black Tree with N nodes?", o: ["O(1)", "O(log N)", "O(N)", "O(N log N)"], a: 1},
            {q: "Which tree structure is optimized for disk storage and database indexing?", o: ["AVL Tree", "B-Tree / B+ Tree", "Binary Search Tree", "Trie"], a: 1},
            {q: "What rotation is used in an AVL tree when a node is inserted in the right subtree of the right child?", o: ["LL Rotation", "RR Rotation", "LR Rotation", "RL Rotation"], a: 1},
            {q: "What is the purpose of Splay Trees?", o: ["Strict balance", "Bringing recently accessed elements close to the root", "Storing strings", "Database index optimization"], a: 1},
            {q: "Which data structure is also known as a digital tree or prefix tree?", o: ["Trie", "Segment Tree", "Suffix Tree", "B-Tree"], a: 0},
            {q: "In a Red-Black Tree, the root node must always be:", o: ["Red", "Black", "Either Red or Black", "Leaf"], a: 1},
            {q: "Which of the following is true for B+ trees compared to B trees?", o: ["Data pointers are in internal nodes only", "All data is stored in leaf nodes", "Leaves are not linked", "It has a lower branching factor"], a: 1},
            {q: "What is the balance factor of a node in an AVL tree defined as?", o: ["Height of Left Subtree - Height of Right Subtree", "Height of Tree - Depth of Node", "Number of Left Children - Number of Right Children", "Depth of Left Child - Depth of Right Child"], a: 0}
        ]
    });

    // 6. Sorting Algorithms
    quizzes.push({
        title: "Sorting Algorithms Mastery",
        questions: [
            {q: "What is the worst-case time complexity of Quick Sort?", o: ["O(N)", "O(N log N)", "O(N^2)", "O(log N)"], a: 2},
            {q: "What is the average-case time complexity of Quick Sort?", o: ["O(N)", "O(N log N)", "O(N^2)", "O(log N)"], a: 1},
            {q: "Which sorting algorithm has a guaranteed O(N log N) time complexity in all cases?", o: ["Quick Sort", "Bubble Sort", "Merge Sort", "Insertion Sort"], a: 2},
            {q: "What is the space complexity of Merge Sort on an array of size N?", o: ["O(1)", "O(log N)", "O(N)", "O(N^2)"], a: 2},
            {q: "What is the best-case time complexity of Insertion Sort (when array is already sorted)?", o: ["O(1)", "O(N)", "O(N log N)", "O(N^2)"], a: 1},
            {q: "Which sorting algorithm is NOT comparison-based?", o: ["Heap Sort", "Merge Sort", "Counting Sort", "Quick Sort"], a: 2},
            {q: "What is the space complexity of Heap Sort?", o: ["O(1)", "O(log N)", "O(N)", "O(N log N)"], a: 0},
            {q: "Which of the following is a stable sorting algorithm by design?", o: ["Quick Sort", "Heap Sort", "Merge Sort", "Selection Sort"], a: 2},
            {q: "What is the primary action in Selection Sort?", o: ["Merging sublists", "Inserting element into sorted part", "Finding the minimum and swapping it to front", "Partitioning around pivot"], a: 2},
            {q: "Which sort is considered in-place and has O(N log N) average complexity?", o: ["Merge Sort", "Radix Sort", "Quick Sort", "Counting Sort"], a: 2}
        ]
    });

    // 7. Searching & Hashing
    quizzes.push({
        title: "Searching & Hashing Techniques",
        questions: [
            {q: "Binary search requires the array to be:", o: ["Linked", "Sorted", "Of even length", "Containing unique elements only"], a: 1},
            {q: "What is the time complexity of Linear Search in the worst case?", o: ["O(1)", "O(log N)", "O(N)", "O(N log N)"], a: 2},
            {q: "Which hash collision resolution method links colliding keys in a list?", o: ["Linear Probing", "Quadratic Probing", "Chaining", "Double Hashing"], a: 2},
            {q: "What is the average-case time complexity of lookup in a Hash Table?", o: ["O(1)", "O(log N)", "O(N)", "O(N^2)"], a: 0},
            {q: "What is the worst-case lookup time complexity of a Hash Table (all items in one bucket)?", o: ["O(1)", "O(log N)", "O(N)", "O(N^2)"], a: 2},
            {q: "Which probing method is prone to primary clustering?", o: ["Chaining", "Linear Probing", "Quadratic Probing", "Double Hashing"], a: 1},
            {q: "What does a load factor in a hash table represent?", o: ["Number of collisions", "Ratio of number of occupied slots to total size", "Size of keys", "Memory limit"], a: 1},
            {q: "Which searching algorithm divides the search interval in half recursively?", o: ["Linear Search", "Binary Search", "Exponential Search", "Ternary Search"], a: 1},
            {q: "What is the time complexity of searching in a Hash Table with open addressing in the worst case?", o: ["O(1)", "O(log N)", "O(N)", "O(N^2)"], a: 2},
            {q: "What is the purpose of a cryptographic hash function compared to standard table hashing?", o: ["Faster computation", "Collision resistance and one-way mapping", "Lower space utilization", "Storing values directly"], a: 1}
        ]
    });

    // 8. Graph Basics
    quizzes.push({
        title: "Graph Representations & Traversals",
        questions: [
            {q: "Which graph representation requires O(V^2) memory space?", o: ["Adjacency List", "Adjacency Matrix", "Incidence Matrix", "Edge List"], a: 1},
            {q: "Which graph representation is best for sparse graphs?", o: ["Adjacency Matrix", "Adjacency List", "Dense Matrix", "None of these"], a: 1},
            {q: "What is the time complexity of Breadth-First Search (BFS) on an adjacency list?", o: ["O(V)", "O(E)", "O(V + E)", "O(V * E)"], a: 2},
            {q: "Which data structure is used to implement Breadth-First Search?", o: ["Stack", "Queue", "Priority Queue", "Heap"], a: 1},
            {q: "Which data structure is used to implement Depth-First Search (DFS) iteratively?", o: ["Stack", "Queue", "Priority Queue", "Hash Table"], a: 0},
            {q: "What is the time complexity of checking if an edge exists in an Adjacency Matrix representation?", o: ["O(1)", "O(log V)", "O(V)", "O(E)"], a: 0},
            {q: "A graph with directed edges and no cycles is called a:", o: ["Tree", "Clique", "Directed Acyclic Graph (DAG)", "Bipartite Graph"], a: 2},
            {q: "Which traversal is used to find the shortest path in an unweighted graph?", o: ["DFS", "BFS", "Inorder", "Preorder"], a: 1},
            {q: "What is the maximum number of edges in a simple undirected graph with V vertices?", o: ["V", "V * (V - 1)", "V * (V - 1) / 2", "V^2"], a: 2},
            {q: "Which algorithm finds strongly connected components in a directed graph?", o: ["Kruskal's", "Dijkstra's", "Tarjan's or Kosaraju's", "Prim's"], a: 2}
        ]
    });

    // 9. Graph Algorithms
    quizzes.push({
        title: "Shortest Paths & Minimum Spanning Trees",
        questions: [
            {q: "Dijkstra's algorithm is used for finding:", o: ["Minimum spanning tree", "Shortest path in weighted graph (no negative weights)", "Topological sort", "Strongly connected components"], a: 1},
            {q: "Which algorithm is used to find shortest paths from a single source when edges have negative weights?", o: ["Dijkstra's", "Bellman-Ford", "Floyd-Warshall", "Kruskal's"], a: 1},
            {q: "Which algorithm finds the shortest paths between all pairs of vertices in a graph?", o: ["Dijkstra's", "Bellman-Ford", "Floyd-Warshall", "Prim's"], a: 2},
            {q: "What is the time complexity of Kruskal's algorithm for Minimum Spanning Tree?", o: ["O(V^2)", "O(E log E)", "O(V + E)", "O(V * E)"], a: 1},
            {q: "Which data structure is used inside Prim's algorithm to efficiently get the next minimum edge?", o: ["Stack", "Queue", "Min-Priority Queue (Heap)", "Hash Table"], a: 2},
            {q: "What is the primary difference between Kruskal's and Prim's algorithms?", o: ["Kruskal's is greedy, Prim's is not", "Kruskal's builds forest of trees, Prim's grows a single tree", "Kruskal's works with negative weights, Prim's does not", "Kruskal's is O(V^2), Prim's is O(E^2)"], a: 1},
            {q: "Which disjoint-set operations are used in Kruskal's algorithm?", o: ["Find and Union", "Insert and Delete", "Push and Pop", "Enqueue and Dequeue"], a: 0},
            {q: "What is the time complexity of Floyd-Warshall algorithm?", o: ["O(V + E)", "O(V log V)", "O(V^2)", "O(V^3)"], a: 3},
            {q: "Can Dijkstra's algorithm work with cycles in the graph?", o: ["No, never", "Yes, as long as there are no negative weight cycles", "Yes, even with negative weight cycles", "Only if it is a DAG"], a: 1},
            {q: "What does a Minimum Spanning Tree span?", o: ["All vertices with minimum total edge weight, without cycles", "All edges with minimum total weight", "Shortest paths from root node", "A subset of vertices containing a cycle"], a: 0}
        ]
    });

    // 10. Advanced Algorithms
    quizzes.push({
        title: "Dynamic Programming & Advanced Concepts",
        questions: [
            {q: "What are the two key attributes of problems solved by Dynamic Programming?", o: ["Optimal substructure and overlapping subproblems", "Greedy choice and recursion", "Divide and conquer", "LIFO and FIFO properties"], a: 0},
            {q: "What is Memoization in Dynamic Programming?", o: ["Bottom-up tabular approach", "Top-down approach storing results of expensive function calls", "Recursive call without caching", "Iterative state transition"], a: 1},
            {q: "The Fibonacci sequence computed bottom-up using an array uses which DP technique?", o: ["Memoization", "Tabulation", "Greedy", "Backtracking"], a: 1},
            {q: "Which approach makes the locally optimal choice at each step with the hope of finding a global optimum?", o: ["Dynamic Programming", "Greedy Algorithm", "Backtracking", "Brute Force"], a: 1},
            {q: "What is the time complexity of solving the 0/1 Knapsack problem with N items and capacity W using DP?", o: ["O(2^N)", "O(N * W)", "O(N log N)", "O(W^2)"], a: 1},
            {q: "What is the main technique used to solve the N-Queens problem?", o: ["Greedy method", "Divide and Conquer", "Backtracking", "Dynamic Programming"], a: 2},
            {q: "What is the time complexity of Matrix Chain Multiplication using Dynamic Programming?", o: ["O(N)", "O(N log N)", "O(N^2)", "O(N^3)"], a: 3},
            {q: "Which data structure is most useful in solving the Longest Common Subsequence (LCS) problem?", o: ["Stack", "Queue", "2D Array (Table)", "Graph"], a: 2},
            {q: "What is the space complexity of bottom-up Fibonacci computation optimized to keep only the last two values?", o: ["O(1)", "O(log N)", "O(N)", "O(N^2)"], a: 0},
            {q: "What distinguishes Backtracking from Brute Force search?", o: ["Backtracking is slower", "Backtracking prunes search trees by checking constraints early", "Backtracking uses a queue instead of a stack", "Backtracking does not use recursion"], a: 1}
        ]
    });
    
    return quizzes;
}

function generateWebdevQuizzes() {
    const quizzes = [];
    
    // 1. HTML5
    quizzes.push({
        title: "HTML5 Structural Semantics",
        questions: [
            {q: "Which tag is used for the primary navigation block?", o: ["<nav>", "<navigation>", "<menu>", "<header>"], a: 0},
            {q: "What does semantic HTML mean?", o: ["HTML tags that format text", "HTML tags that convey meaning about content", "HTML tags that include CSS", "HTML tags for scripting"], a: 1},
            {q: "Which HTML5 element is used to display self-contained content, like photos with captions?", o: ["<aside>", "<section>", "<figure>", "<details>"], a: 2},
            {q: "What is the correct tag for embedding a video file in HTML5?", o: ["<media>", "<embed>", "<video>", "<object>"], a: 2},
            {q: "Which attribute specifies an alternate text for an image if it cannot be displayed?", o: ["title", "src", "alt", "description"], a: 2},
            {q: "What does the '<main>' element represent?", o: ["The footer of a page", "The navigation menu", "The dominant content of the body of a document", "A sidebar containing links"], a: 2},
            {q: "Which input type creates a slider control in HTML5 forms?", o: ["type='slider'", "type='range'", "type='number'", "type='volume'"], a: 1},
            {q: "What is the purpose of the '<meta charset=\"UTF-8\">' tag?", o: ["Configures page layout width", "Specifies character encoding for the document", "Defines the site description for SEO", "Links an external script"], a: 1},
            {q: "Which HTML5 element represents content that is tangentially related to the main content (e.g. sidebar)?", o: ["<section>", "<article>", "<aside>", "<summary>"], a: 2},
            {q: "What is the function of the '<doctype html>' declaration?", o: ["Instructs browser about the HTML version used", "Imports CSS stylesheets", "Creates a root element", "Executes initial JavaScript"], a: 0}
        ]
    });

    // 2. CSS Basics & Box Model
    quizzes.push({
        title: "CSS Mechanics & The Box Model",
        questions: [
            {q: "What are the components of the CSS Box Model from inside out?", o: ["Margin, Border, Padding, Content", "Content, Padding, Border, Margin", "Content, Border, Padding, Margin", "Padding, Content, Border, Margin"], a: 1},
            {q: "By default, what does 'width' apply to when 'box-sizing: content-box' is active?", o: ["Content area only", "Content + Padding", "Content + Padding + Border", "Entire element including margin"], a: 0},
            {q: "What does 'box-sizing: border-box' ensure?", o: ["Adds a default border to all elements", "Includes padding and border in the specified width and height", "Sets margin to zero", "Allows elements to overflow parent container"], a: 1},
            {q: "Which CSS selector has the highest specificity?", o: ["Class selector (.item)", "ID selector (#header)", "Element selector (div)", "Inline styles"], a: 3},
            {q: "What value of the 'position' property positions an element relative to the viewport?", o: ["static", "relative", "absolute", "fixed"], a: 3},
            {q: "How does 'position: absolute' position an element?", o: ["Relative to the viewport", "Relative to its normal position", "Relative to its closest positioned ancestor", "Relative to the screen size"], a: 2},
            {q: "What is the default display value of a '<div>' element?", o: ["inline", "block", "inline-block", "flex"], a: 1},
            {q: "Which property is used to change the text color of an element in CSS?", o: ["font-color", "text-color", "color", "background-color"], a: 2},
            {q: "How do you select an element with ID 'demo' in CSS?", o: [".demo", "#demo", "demo", "*demo"], a: 1},
            {q: "What happens to elements with 'display: none'?", o: ["Hidden but still occupy space in the layout", "Removed entirely from the document layout flow", "Semi-transparent", "Moved offscreen"], a: 1}
        ]
    });

    // 3. CSS Layouts (Flexbox & Grid)
    quizzes.push({
        title: "CSS Layout Systems",
        questions: [
            {q: "Which property defines a flex container?", o: ["flex: 1", "display: flex", "flex-direction: row", "align-items: center"], a: 1},
            {q: "Which property aligns flex items along the main axis of a flex container?", o: ["align-items", "justify-content", "align-content", "flex-flow"], a: 1},
            {q: "Which property aligns flex items along the cross axis?", o: ["justify-content", "align-items", "flex-wrap", "align-self"], a: 1},
            {q: "What does the 'flex-wrap: wrap' property do?", o: ["Compresses items to fit one line", "Allows flex items to wrap onto multiple lines if space is insufficient", "Reverses layout order", "Hides overflowing items"], a: 1},
            {q: "In CSS Grid, which property defines the columns of a grid container?", o: ["grid-template-rows", "grid-template-columns", "grid-column-gap", "grid-columns"], a: 1},
            {q: "What unit represents a fraction of the free space in a grid container?", o: ["em", "fr", "rem", "vh"], a: 1},
            {q: "What is the shorthand property for setting both grid-row-gap and grid-column-gap?", o: ["gap", "grid-gap", "spacing", "Both gap and grid-gap are valid in modern CSS"], a: 3},
            {q: "How can you make a flex item grow to occupy remaining space?", o: ["flex-shrink: 1", "flex-grow: 1", "flex-basis: 100%", "flex: initial"], a: 1},
            {q: "What does 'align-self' allow you to do in a flex container?", o: ["Override alignment for a single item", "Set alignment for the container", "Set margin for all items", "Align columns in grid"], a: 0},
            {q: "Which property sets the initial main size of a flex item?", o: ["flex-grow", "flex-shrink", "flex-basis", "width"], a: 2}
        ]
    });

    // 4. Responsive Design
    quizzes.push({
        title: "Responsive Layouts & Media Queries",
        questions: [
            {q: "Which CSS feature allows styling based on screen characteristics like width?", o: ["Media Queries", "Animations", "Variables", "Grid"], a: 0},
            {q: "What is a 'breakpoint' in responsive design?", o: ["The point where the website stops working", "A screen width value at which the layout changes using media queries", "The max limit of image sizes", "A CSS error"], a: 1},
            {q: "Which meta tag is crucial for responsive layout rendering on mobile devices?", o: ["<meta name='mobile'>", "<meta name='viewport' content='width=device-width, initial-scale=1.0'>", "<meta charset='UTF-8'>", "<meta name='handheld'>"], a: 1},
            {q: "What does 'rem' unit stand for in CSS?", o: ["Relative to element font-size", "Relative to root (html) element's font-size", "Relative to parent margin", "Ratio of exact measurement"], a: 1},
            {q: "What does '100vh' represent?", o: ["100% of the viewport width", "100% of the viewport height", "100px vertical height", "100% of parent height"], a: 1},
            {q: "Which approach designs for small screens first and expands for larger screens?", o: ["Desktop-First", "Mobile-First", "Fluid Grid Design", "Hybrid design"], a: 1},
            {q: "What does 'vw' stand for in CSS units?", o: ["Viewport Width", "Vertical Width", "Vector Width", "Viewport Weight"], a: 0},
            {q: "Which CSS rule is used to define a media query?", o: ["@media", "@query", "@responsive", "@screen"], a: 0},
            {q: "What is the effect of setting 'max-width: 100%' on an image?", o: ["Image is stretched to fill the screen", "Image scales down but never expands beyond its original size", "Image size is locked to 100px", "Image is cropped"], a: 1},
            {q: "Which media query condition matches devices with width between 600px and 900px?", o: ["@media (min-width: 600px) and (max-width: 900px)", "@media (width: 600-900px)", "@media (min-width: 600px) or (max-width: 900px)", "@media (width > 600px, width < 900px)"], a: 0}
        ]
    });

    // 5. DOM & Events
    quizzes.push({
        title: "DOM Manipulation & Event Propagation",
        questions: [
            {q: "What does DOM stand for?", o: ["Data Object Model", "Document Object Model", "Dynamic Object Model", "Direct Object Mapping"], a: 1},
            {q: "Which method is used to find an element by its ID?", o: ["document.querySelector()", "document.getElementById()", "document.findId()", "document.searchElement()"], a: 1},
            {q: "Which method returns the first element matching a CSS selector?", o: ["document.getElementById", "document.querySelector", "document.querySelectorAll", "document.getElementsByClassName"], a: 1},
            {q: "What is Event Bubbling?", o: ["Event starting from the target element and propagating upwards through its ancestors", "Event starting from document root and moving down to target", "Event occurring in multiple tabs", "An error in event listener registration"], a: 0},
            {q: "What method stops event propagation during bubbling or capturing?", o: ["event.preventDefault()", "event.stopPropagation()", "event.stop()", "event.cancelBubble = false"], a: 1},
            {q: "What method prevents the default browser action of an event (like form submit)?", o: ["event.stopPropagation()", "event.preventDefault()", "event.cancel()", "event.halt()"], a: 1},
            {q: "How do you register an event handler on a DOM element?", o: ["element.addListener()", "element.addEventListener()", "element.registerEvent()", "element.on()"], a: 1},
            {q: "What does 'event.target' represent in an event handler?", o: ["The element that the event listener is attached to", "The element that triggered the event", "The parent of the clicked element", "The window object"], a: 1},
            {q: "Which method is used to create a new DOM element dynamically?", o: ["document.newElement()", "document.createElement()", "document.buildNode()", "element.append()"], a: 1},
            {q: "What is Event Delegation?", o: ["Assigning event handling to a sub-agent", "Attaching a single event listener to a parent element to manage events for its children", "Registering events asynchronously", "Passing events between iframe boundaries"], a: 1}
        ]
    });

    // 6. React Core
    quizzes.push({
        title: "React Core Concepts",
        questions: [
            {q: "What is the Virtual DOM in React?", o: ["A browser copy of the page", "An in-memory lightweight representation of the real DOM", "A database system for React", "A component styling tool"], a: 1},
            {q: "What is JSX?", o: ["A JavaScript XML syntax extension that allows writing HTML-like structure in JS", "A styling engine", "A routing framework", "A state management container"], a: 0},
            {q: "How are properties (props) passed into a React component?", o: ["As function parameters (first argument)", "Through local state variable", "Via context injection only", "Through global environment variables"], a: 0},
            {q: "Are React props mutable within the child component?", o: ["Yes, always", "No, props are read-only", "Only if declared with let", "Only if it is a functional component"], a: 1},
            {q: "What is the entry point element in a standard Vite React application index.html?", o: ["<div id='react'>", "<div id='root'>", "<div class='app'>", "<app-root>"], a: 1},
            {q: "Which tool renders React components into the actual DOM?", o: ["react-router", "react-dom", "redux", "babel"], a: 1},
            {q: "What must functional React components return?", o: ["JSX / React elements (or null)", "Strings only", "Nothing", "A JavaScript object containing data"], a: 0},
            {q: "What is a React key prop used for?", o: ["To secure data transmission", "To identify elements uniquely in lists for DOM reconciliation", "To style individual items", "To register event handlers"], a: 1},
            {q: "Which syntax is used to embed expressions in JSX?", o: ["Double braces {{ expr }}", "Curly braces { expr }", "Angle brackets < expr >", "Parentheses ( expr )"], a: 1},
            {q: "What is a React Fragment (<>...</>) used for?", o: ["Renders a styled card wrapper", "Groups multiple children elements without adding extra nodes to the DOM", "Caches children nodes", "Renders a modal popup"], a: 1}
        ]
    });

    // 7. React State & Hooks
    quizzes.push({
        title: "React State & Hooks API",
        questions: [
            {q: "Which hook is used to declare state variables in React?", o: ["useEffect", "useState", "useContext", "useRef"], a: 1},
            {q: "Which hook manages side-effects like data fetching, subscriptions, or DOM mutations?", o: ["useState", "useEffect", "useMemo", "useCallback"], a: 1},
            {q: "When does the callback inside useEffect run if the dependency array is empty ([])?", o: ["On every component render", "Only once after the component mounts", "On every state update", "When the component is about to unmount"], a: 1},
            {q: "What happens when you call the setter function returned by useState?", o: ["The browser reloads the page", "React schedules a re-render of the component with the new state", "The props are mutated immediately", "The virtual DOM is deleted"], a: 1},
            {q: "Which hook can be used to hold a mutable value that doesn't trigger re-renders?", o: ["useState", "useRef", "useMemo", "useReducer"], a: 1},
            {q: "Which hook is used to memoize expensive computations?", o: ["useMemo", "useCallback", "useEffect", "useContext"], a: 0},
            {q: "What does the callback returned by useEffect represent?", o: ["The init function", "The cleanup function", "An error handler", "The next state value"], a: 1},
            {q: "Can you call React hooks inside conditional blocks or loops?", o: ["Yes, anytime", "No, hooks must only be called at the top level of React functions", "Only inside useEffect", "Only in class components"], a: 1},
            {q: "Which hook is an alternative to useState for managing complex state objects?", o: ["useContext", "useReducer", "useCallback", "useLayoutEffect"], a: 1},
            {q: "How does React detect that state has changed to trigger a re-render?", o: ["Object reference comparison (Object.is)", "Deep string parsing", "Checking server updates", "Random intervals"], a: 0}
        ]
    });

    // 8. React Routing & Context
    quizzes.push({
        title: "React Router & Context API",
        questions: [
            {q: "What is the primary benefit of the Context API?", o: ["Faster network calls", "Sharing state globally without manual prop-drilling", "Creating database connections", "Automating form validation"], a: 1},
            {q: "Which hook is used to consume a React Context?", o: ["useContext", "useProvider", "useState", "useReducer"], a: 0},
            {q: "What component is used to define a single route in React Router?", o: ["<Link>", "<Route>", "<Routes>", "<BrowserRouter>"], a: 1},
            {q: "Which component in React Router prevents full page refreshes when navigating?", o: ["<a> tag", "<Link>", "<Navigate>", "<RouterLink>"], a: 1},
            {q: "Which hook in React Router allows programmatic page navigation?", o: ["useLocation", "useParams", "useNavigate", "useRoutes"], a: 2},
            {q: "Which hook extracts dynamic URL parameters (e.g. /course/:id) in React Router?", o: ["useLocation", "useParams", "useSearch", "useMatch"], a: 1},
            {q: "What component provides context to child elements?", o: ["Context.Consumer", "Context.Provider", "Context.Wrapper", "Context.Hook"], a: 1},
            {q: "What is the standard wrapper component for routing in web apps?", o: ["<HashRouter>", "<BrowserRouter>", "<MemoryRouter>", "<RouteProvider>"], a: 1},
            {q: "Which component renders matched nested routes in parent routes?", o: ["<Outlet>", "<Nested>", "<Children>", "<SubRoute>"], a: 0},
            {q: "What happens to context consumers when the context value changes?", o: ["They do not update", "They are unmounted and remounted", "They automatically re-render with the new value", "They throw an error"], a: 2}
        ]
    });

    // 9. HTTP & REST APIs
    quizzes.push({
        title: "HTTP, REST & Fetch API",
        questions: [
            {q: "Which HTTP method is used to retrieve resource data from a server?", o: ["POST", "GET", "PUT", "DELETE"], a: 1},
            {q: "Which HTTP method is used to submit new data to a server?", o: ["GET", "POST", "HEAD", "OPTIONS"], a: 1},
            {q: "Which HTTP method is typically used to update an entire existing resource?", o: ["POST", "GET", "PUT", "PATCH"], a: 2},
            {q: "What HTTP status code range represents client errors?", o: ["2xx", "3xx", "4xx", "5xx"], a: 2},
            {q: "What does HTTP status code 404 represent?", o: ["Bad Request", "Unauthorized", "Forbidden", "Not Found"], a: 3},
            {q: "What HTTP status code represents an internal server error?", o: ["400", "403", "500", "503"], a: 2},
            {q: "What does REST stand for?", o: ["Representational State Transfer", "Responsive Server Tech", "Remote State Tracking", "Representational Storage Tool"], a: 0},
            {q: "Which HTTP header is commonly used to specify the media type of the payload?", o: ["Accept", "Content-Type", "Authorization", "User-Agent"], a: 1},
            {q: "What JavaScript method is built into browsers for making network requests?", o: ["axios.get()", "fetch()", "ajax()", "http()"], a: 1},
            {q: "What format is most commonly used for sending data in REST APIs?", o: ["XML", "JSON", "CSV", "YAML"], a: 1}
        ]
    });

    // 10. Web Build & Security
    quizzes.push({
        title: "Web Packaging & Security Basics",
        questions: [
            {q: "What does CORS stand for?", o: ["Cross-Origin Resource Sharing", "Cross-Origin Routing System", "Common Object Request Standard", "Client-Origin Redirect Security"], a: 0},
            {q: "Why does a browser trigger a CORS block?", o: ["The server crashes", "A request is made to a different domain without appropriate CORS headers from the server", "The database fails to authenticate", "The user password is weak"], a: 1},
            {q: "Where does localStorage store data?", o: ["In the server database", "In the client browser with no expiration date", "In memory for the session only", "In an encrypted file"], a: 1},
            {q: "How does sessionStorage differ from localStorage?", o: ["It has higher capacity", "Data is cleared when the page session/tab ends", "It is encrypted", "It is stored on the server"], a: 1},
            {q: "What is the purpose of a bundler like Vite or Webpack?", o: ["Runs the database", "Compiles and bundles assets, modules, and code for production deployment", "Minifies server code", "Handles HTTP requests"], a: 1},
            {q: "Which storage mechanism is sent to the server on every HTTP request automatically?", o: ["localStorage", "sessionStorage", "Cookies", "IndexedDB"], a: 2},
            {q: "What is NPM?", o: ["Node Package Manager", "Net Protocol Module", "Network Performance Monitor", "Node Process Manager"], a: 0},
            {q: "What does the 'npm run build' script do in React projects?", o: ["Starts a hot-reloading dev server", "Creates an optimized, minified bundle of the frontend app in a dist folder", "Runs database migrations", "Starts unit testing"], a: 1},
            {q: "Which security measure prevents unauthorized execution of foreign scripts on a page?", o: ["CORS", "Content Security Policy (CSP)", "SSL certificates", "CSRF tokens"], a: 1},
            {q: "What does SSL/HTTPS provide for users?", o: ["Faster page speeds", "Data encryption between browser and server", "Automatic backup of user files", "Database indexing"], a: 1}
        ]
    });
    
    return quizzes;
}

function generateDbmsQuizzes() {
    const quizzes = [];
    
    // 1. Database Concepts
    quizzes.push({
        title: "Database Systems & Schema Architecture",
        questions: [
            {q: "What does DBMS stand for?", o: ["Database Management Systems", "Data Base Management Structure", "Direct Database Method System", "Distributed Database Model Service"], a: 0},
            {q: "What is the physical schema of a database?", o: ["How the data is organized logically in tables", "How the data is actually stored in disk files and blocks", "How the user views the records", "The query optimization strategy"], a: 1},
            {q: "What is data independence?", o: ["Data is stored in separate databases", "Ability to modify schema at one level without altering the schema at the next level", "Data is secured from external hacking", "Data has no duplicate values"], a: 1},
            {q: "A column or set of columns that uniquely identifies a row in a table is called a:", o: ["Foreign Key", "Primary Key", "Index Key", "Composite Attribute"], a: 1},
            {q: "What is database metadata?", o: ["Encrypted data", "Data describing the structure and constraints of the database (schema definitions)", "Archived historical logs", "Temporary query results"], a: 1},
            {q: "Which level of data abstraction hides details of physical storage?", o: ["Physical level", "Logical (Conceptual) level", "View level", "All of these"], a: 1},
            {q: "A collection of conceptual tools for describing data, relationships, and constraints is a:", o: ["SQL language", "Data Model", "File System", "Table Schema"], a: 1},
            {q: "Which DBMS type organizes data as parent-child tree nodes?", o: ["Relational model", "Hierarchical model", "Network model", "Object-oriented model"], a: 1},
            {q: "What is a database instance?", o: ["The database structure", "The actual data stored in the database at a specific moment in time", "A backup copy of the database", "The query execution engine"], a: 1},
            {q: "What is the role of a Database Administrator (DBA)?", o: ["Writing frontend code", "Designing, securing, monitoring, and maintaining the database infrastructure", "Creating content pages", "Running local desktop software"], a: 1}
        ]
    });

    // 2. ER Models
    quizzes.push({
        title: "Entity-Relationship Modeling",
        questions: [
            {q: "In an ER Diagram, what does a rectangle represent?", o: ["Attribute", "Entity set", "Relationship set", "Weak Attribute"], a: 1},
            {q: "In an ER Diagram, what does an ellipse represent?", o: ["Entity set", "Relationship", "Attribute", "Key constraint"], a: 2},
            {q: "In an ER Diagram, what does a diamond represent?", o: ["Entity", "Attribute", "Relationship", "Constraint"], a: 2},
            {q: "What is a composite attribute?", o: ["An attribute with multiple values", "An attribute that can be divided into smaller sub-parts (e.g. name to first/last)", "An attribute derived from other fields", "A unique primary key"], a: 1},
            {q: "What is a multivalued attribute represented by in ER diagrams?", o: ["Double rectangle", "Double ellipse", "Dashed ellipse", "Double diamond"], a: 1},
            {q: "What is a weak entity?", o: ["An entity with low security", "An entity that does not have a primary key and depends on an identifying relationship with another entity", "An entity with few columns", "A temporary table"], a: 1},
            {q: "Which attribute value is computed from other attributes (e.g. age from date of birth)?", o: ["Key attribute", "Derived attribute", "Composite attribute", "Multivalued attribute"], a: 1},
            {q: "What does cardinality in a relationship define?", o: ["Number of attributes in an entity", "Number of entity instances that can participate in a relationship set", "Size of table rows", "Number of keys in schema"], a: 1},
            {q: "In ER Diagrams, a double rectangle represents a:", o: ["Weak entity set", "Relationship set", "Multivalued attribute", "Derived attribute"], a: 0},
            {q: "What is a primary key attribute represented as in an ER diagram?", o: ["Ellipse", "Ellipse with text underlined", "Dashed ellipse", "Diamond"], a: 1}
        ]
    });

    // 3. Relational Algebra
    quizzes.push({
        title: "Relational Algebra Operations",
        questions: [
            {q: "Which relational algebra operation filters rows based on a predicate condition?", o: ["Project (π)", "Select (σ)", "Join (⨝)", "Union (∪)"], a: 1},
            {q: "Which relational algebra operation selects specified columns from a relation?", o: ["Select (σ)", "Project (π)", "Cartesian Product (x)", "Rename (ρ)"], a: 1},
            {q: "What is the result of the Cartesian Product of relation R (m rows) and S (n rows)?", o: ["m + n rows", "m * n rows", "m - n rows", "Max(m, n) rows"], a: 1},
            {q: "Which relational algebra operation combines matching tuples from two relations?", o: ["Intersection (∩)", "Natural Join (⨝)", "Project (π)", "Division (/)"], a: 1},
            {q: "Which symbol is used for the Project operation in relational algebra?", o: ["Sigma (σ)", "Pi (π)", "Rho (ρ)", "Theta (θ)"], a: 1},
            {q: "Which symbol is used for the Rename operation?", o: ["Sigma (σ)", "Pi (π)", "Rho (ρ)", "Phi (φ)"], a: 2},
            {q: "Is Relational Algebra a procedural or non-procedural query language?", o: ["Procedural (tells how to fetch data)", "Non-procedural (tells what data to fetch)", "Declarative", "Object-oriented"], a: 0},
            {q: "For the Union (R ∪ S) operation to be valid, what condition must R and S satisfy?", o: ["Same number of rows", "Union compatibility (same number and domains of attributes)", "Must have a shared primary key", "Must be of the same database instance"], a: 1},
            {q: "Which operation finds tuples present in relation R but NOT in S?", o: ["Intersection (∩)", "Set Difference (-)", "Division (/)", "Union (∪)"], a: 1},
            {q: "Which operation is equivalent to a Cartesian Product followed by a Selection?", o: ["Natural Join", "Theta Join", "Outer Join", "Project"], a: 1}
        ]
    });

    // 4. SQL Basics
    quizzes.push({
        title: "SQL Syntax & Grouping",
        questions: [
            {q: "Which SQL statement is used to extract data from a database?", o: ["EXTRACT", "GET", "SELECT", "OPEN"], a: 2},
            {q: "Which clause is used to filter records in a SELECT query?", o: ["HAVING", "WHERE", "ORDER BY", "GROUP BY"], a: 1},
            {q: "How do you sort the results of a query in SQL?", o: ["SORT BY", "ORDER BY", "GROUP BY", "ARRANGE BY"], a: 1},
            {q: "Which SQL clause is used to group rows that have the same values?", o: ["ORDER BY", "HAVING", "GROUP BY", "WHERE"], a: 2},
            {q: "What clause filters grouped rows after a GROUP BY operation?", o: ["WHERE", "HAVING", "LIMIT", "FILTER"], a: 1},
            {q: "Which SQL aggregate function returns the total number of rows?", o: ["SUM()", "COUNT()", "TOTAL()", "MAX()"], a: 1},
            {q: "How do you select unique/distinct values in SQL?", o: ["SELECT UNIQUE", "SELECT DISTINCT", "SELECT DIFFERENT", "SELECT SINGLE"], a: 1},
            {q: "What SQL operator is used to search for a specified pattern in a column?", o: ["BETWEEN", "LIKE", "IN", "MATCH"], a: 1},
            {q: "What wildcard character represents zero, one, or multiple characters in SQL LIKE pattern matching?", o: ["Question mark (?)", "Percent sign (%)", "Underscore (_)", "Asterisk (*)"], a: 1},
            {q: "What wildcard represents a single character in SQL LIKE?", o: ["%", "_", "*", "?"], a: 1}
        ]
    });

    // 5. SQL Joins & Subqueries
    quizzes.push({
        title: "SQL Relational Joins & Subqueries",
        questions: [
            {q: "Which JOIN returns all matching rows from both tables?", o: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL JOIN"], a: 0},
            {q: "Which JOIN returns all rows from the left table, and matching rows from the right table?", o: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "CROSS JOIN"], a: 1},
            {q: "What JOIN returns every possible combination of rows from two tables?", o: ["INNER JOIN", "CROSS JOIN", "NATURAL JOIN", "OUTER JOIN"], a: 1},
            {q: "A query nested inside another SQL statement is called a:", o: ["Nested Join", "Subquery", "Index", "Trigger"], a: 1},
            {q: "What is a correlated subquery?", o: ["A subquery that runs independently of the outer query", "A subquery that references columns from the outer query", "A subquery that returns a table", "A query with multiple joins"], a: 1},
            {q: "Which join returns all rows from both tables, including non-matching rows filled with NULL?", o: ["INNER JOIN", "LEFT OUTER JOIN", "FULL OUTER JOIN", "CROSS JOIN"], a: 2},
            {q: "What is the difference between WHERE and JOIN ON?", o: ["No difference", "ON sets join condition; WHERE filters rows after the join", "ON is slower", "WHERE is only for numeric columns"], a: 1},
            {q: "Which operator returns true if a subquery returns any rows?", o: ["ANY", "ALL", "EXISTS", "IN"], a: 2},
            {q: "Which keyword combines results of two SELECT statements, removing duplicates?", o: ["UNION", "UNION ALL", "INTERSECT", "EXCEPT"], a: 0},
            {q: "Which keyword combines results of two SELECT statements, keeping duplicate rows?", o: ["UNION", "UNION ALL", "MERGE", "JOIN"], a: 1}
        ]
    });

    // 6. Database Normalization
    quizzes.push({
        title: "Database Normalization & Normal Forms",
        questions: [
            {q: "What is the primary goal of Database Normalization?", o: ["Speed up queries", "Eliminate redundant data and prevent anomalies", "Encrypt records", "Convert database to NoSQL"], a: 1},
            {q: "A table is in 1st Normal Form (1NF) if:", o: ["It has no foreign keys", "All attribute values are atomic (no repeating groups or multi-valued fields)", "It has a composite key", "It is linked to another table"], a: 1},
            {q: "What dependency does 2nd Normal Form (2NF) eliminate?", o: ["Transitive dependency", "Partial dependency on candidate keys", "Multivalued dependency", "Trivial functional dependency"], a: 1},
            {q: "What dependency does 3rd Normal Form (3NF) eliminate?", o: ["Partial dependency", "Transitive dependency", "Join dependency", "Multivalued dependency"], a: 1},
            {q: "Boyce-Codd Normal Form (BCNF) requires that for every functional dependency X -> Y, X must be a:", o: ["Primary Key only", "Super Key", "Candidate Key only", "Foreign Key"], a: 1},
            {q: "Which normal form addresses multivalued dependencies?", o: ["2NF", "3NF", "BCNF", "4NF"], a: 3},
            {q: "What anomaly occurs when deleting a row removes unrelated essential information?", o: ["Insertion anomaly", "Deletion anomaly", "Update anomaly", "Selection anomaly"], a: 1},
            {q: "What does a transitive dependency mean?", o: ["A primary key determines a non-prime column", "A non-prime column determines another non-prime column (A -> B -> C)", "A column is dependent on half of a composite key", "Multiple columns determine one column"], a: 1},
            {q: "Is BCNF stronger or weaker than 3NF?", o: ["Stronger", "Weaker", "Equally strong", "Completely unrelated"], a: 0},
            {q: "Which normal form deals with Join Dependencies?", o: ["3NF", "BCNF", "4NF", "5NF"], a: 3}
        ]
    });

    // 7. Transactions & ACID
    quizzes.push({
        title: "Transactions & ACID Properties",
        questions: [
            {q: "What does ACID stand for in databases?", o: ["Automated, Consistent, Isolated, Durable", "Atomicity, Consistency, Isolation, Durability", "Asynchronous, Concurrent, Independent, Distributed", "Available, Consistent, Isolated, Distributed"], a: 1},
            {q: "Which ACID property guarantees that all steps of a transaction complete, or none do?", o: ["Consistency", "Atomicity", "Isolation", "Durability"], a: 1},
            {q: "Which ACID property ensures transaction changes are saved permanently even in a system crash?", o: ["Atomicity", "Consistency", "Isolation", "Durability"], a: 3},
            {q: "Which ACID property prevents concurrent transactions from seeing each other's intermediate state?", o: ["Consistency", "Isolation", "Durability", "Atomicity"], a: 1},
            {q: "What SQL command commits all transaction changes to the database?", o: ["SAVE", "COMMIT", "ROLLBACK", "END"], a: 1},
            {q: "What SQL command reverts transaction changes back to original state?", o: ["COMMIT", "UNDO", "ROLLBACK", "CANCEL"], a: 2},
            {q: "A transaction state after all statements have been executed but changes are not yet committed is:", o: ["Active", "Partially Committed", "Committed", "Failed"], a: 1},
            {q: "What does 'Dirty Read' in transaction isolation represent?", o: ["A transaction reads data updated by another uncommitted transaction", "Reading deleted data", "Reading duplicate data", "Writing data concurrently"], a: 0},
            {q: "Which transaction isolation level provides maximum security but lowest concurrency?", o: ["Read Uncommitted", "Read Committed", "Repeatable Read", "Serializable"], a: 3},
            {q: "What does a 'Savepoint' do in SQL transactions?", o: ["Commits the query", "Sets a point to which a transaction can be rolled back without rolling back the entire transaction", "Creates a table backup", "Closes the database connection"], a: 1}
        ]
    });

    // 8. Concurrency Control
    quizzes.push({
        title: "Concurrency Control & Deadlocks",
        questions: [
            {q: "What does Two-Phase Locking (2PL) protocol ensure?", o: ["No deadlocks", "Conflict Serializability", "Durable writes", "Zero latency"], a: 1},
            {q: "What are the two phases in 2PL?", o: ["Growing phase and Shrinking phase", "Locking phase and Unlocking phase", "Read phase and Write phase", "Commit phase and Rollback phase"], a: 0},
            {q: "What lock allows multiple transactions to read but none to write?", o: ["Exclusive lock (X-lock)", "Shared lock (S-lock)", "Intention lock", "Deadlock"], a: 1},
            {q: "What lock is required for writing to a data item?", o: ["Shared lock", "Exclusive lock", "Read lock", "Semantic lock"], a: 1},
            {q: "A deadlock occurs when:", o: ["A query takes too long", "Two transactions wait for each other's locks in a circular chain", "The database runs out of disk storage", "An index is missing"], a: 1},
            {q: "Which method resolves deadlocks by aborting one of the waiting transactions?", o: ["Deadlock Prevention", "Deadlock Detection & Victim Selection", "Two-phase commit", "Lock escalation"], a: 1},
            {q: "What graph is checked to detect deadlocks in a database?", o: ["Call graph", "Wait-For Graph (WFG)", "Directed Acyclic Graph (DAG)", "Transition graph"], a: 1},
            {q: "In deadlock prevention, what does the 'Wait-Die' scheme do?", o: ["Older transaction waits for younger; younger transaction dies (dies/aborts)", "Younger transaction waits for older", "Both abort", "No transaction waits"], a: 0},
            {q: "In deadlock prevention, what does the 'Wound-Wait' scheme do?", o: ["Younger wounds older", "Older transaction wounds (preempts/aborts) younger; younger waits if older has lock", "All transactions wait", "Both abort"], a: 1},
            {q: "What does lock granularity refer to?", o: ["The size of lock keys", "The size of database items locked (row, page, table, database)", "The duration of the lock", "The speed of locking"], a: 1}
        ]
    });

    // 9. Indexing & Optimization
    quizzes.push({
        title: "Indexing & Query Optimization",
        questions: [
            {q: "What is the primary benefit of creating an index on a table?", o: ["Saves disk space", "Speeds up data retrieval operations", "Automates data encryption", "Ensures normal form conformity"], a: 1},
            {q: "What index stores data rows in the same sorted order as the index key?", o: ["Clustered Index", "Non-clustered Index", "Hash Index", "Sparse Index"], a: 0},
            {q: "How many clustered indexes can a table have?", o: ["0", "1", "As many as needed", "10"], a: 1},
            {q: "What data structure is most commonly used for relational database indexes?", o: ["Hash Table", "B+ Tree", "Singly Linked List", "Binary Search Tree"], a: 1},
            {q: "Why is B+ Tree preferred over B Tree for database indexes?", o: ["B+ Tree is smaller", "B+ Tree stores data only in leaf nodes, allowing faster traversal via leaf links", "B+ Tree has higher height", "B+ Tree does not use pointers"], a: 1},
            {q: "What SQL keyword displays the query execution plan in most RDBMS?", o: ["DESCRIBE", "EXPLAIN", "SHOW PLAN", "ANALYZE"], a: 1},
            {q: "What is a full table scan?", o: ["Reading only index nodes", "Reading every block and row of a table from disk", "Reading schema metadata", "Creating a new table"], a: 1},
            {q: "What does query optimization do?", o: ["Minimizes the size of SQL scripts", "Finds the most efficient execution plan for a query based on costs", "Deletes redundant tables", "Formats SELECT commands automatically"], a: 1},
            {q: "What index is best suited for exact match queries (e.g. SELECT WHERE id = 5) but bad for range queries?", o: ["B+ Tree Index", "Hash Index", "Clustered Index", "Dense Index"], a: 1},
            {q: "What is a composite index?", o: ["An index containing data pointers", "An index built on two or more columns of a table", "An index containing multiple data formats", "An index generated automatically"], a: 1}
        ]
    });

    // 10. NoSQL & MongoDB
    quizzes.push({
        title: "NoSQL Systems & CAP Theorem",
        questions: [
            {q: "Which theorem states that a distributed system can only provide two of: Consistency, Availability, and Partition Tolerance?", o: ["ACID Theorem", "CAP Theorem", "BASE Theorem", "Codds Theorem"], a: 1},
            {q: "MongoDB is classified as which type of NoSQL database?", o: ["Key-Value store", "Document store", "Column-Family store", "Graph database"], a: 1},
            {q: "In MongoDB, database rows are represented as:", o: ["XML strings", "BSON/JSON Documents", "CSV rows", "SQL tuples"], a: 1},
            {q: "In MongoDB, a collection is equivalent to what in a relational database?", o: ["Database", "Table", "Row", "Column"], a: 1},
            {q: "Which database type stores data as key-value pairs (e.g. Redis)?", o: ["Document store", "Key-Value store", "Graph database", "Wide-column store"], a: 1},
            {q: "What NoSQL database type is best suited for social networks and relationship mapping?", o: ["Key-Value", "Document", "Graph Database (e.g. Neo4j)", "Column-Family"], a: 2},
            {q: "What does the BASE properties represent in NoSQL?", o: ["Basic Availability, Soft state, Eventual consistency", "Basic Atomicity, Standard Execution", "Backup, Archival, Storage, Encryption", "Binary, Asymmetric, Secure, Encryption"], a: 0},
            {q: "Which CAP property guarantees that every write is immediately reflected across all nodes?", o: ["Consistency", "Availability", "Partition Tolerance", "None of these"], a: 0},
            {q: "Which CAP property guarantees that every non-failing node returns a response for requests?", o: ["Consistency", "Availability", "Partition Tolerance", "Durability"], a: 1},
            {q: "What MongoDB command is used to insert a document into a collection?", o: ["db.collection.insert() / insertOne()", "INSERT INTO", "ADD DOCUMENT", "db.add()"], a: 0}
        ]
    });
    
    return quizzes;
}

function generateNetsecQuizzes() {
    const quizzes = [];
    
    // 1. Security Fundamentals
    quizzes.push({
        title: "Security Fundamentals & Threat Modeling",
        questions: [
            {q: "What are the three core principles of the CIA Triad?", o: ["Control, Integrity, Authorization", "Confidentiality, Integrity, Availability", "Cryptography, Identity, Authentication", "Compliance, Inspection, Audit"], a: 1},
            {q: "Which principle guarantees that unauthorized users cannot read data?", o: ["Integrity", "Confidentiality", "Availability", "Non-repudiation"], a: 1},
            {q: "Which principle ensures that data is not altered in transit?", o: ["Confidentiality", "Integrity", "Availability", "Authenticity"], a: 1},
            {q: "What does non-repudiation mean?", o: ["Data cannot be copied", "A sender cannot deny having sent a message, and a receiver cannot deny having received it", "System is always online", "Users are logged out automatically"], a: 1},
            {q: "What is a vulnerability?", o: ["A software exploit in progress", "A weakness in a system that can be exploited by threats", "A network firewall block", "An authorized user account"], a: 1},
            {q: "What is an exploit?", o: ["A system security audit", "A method, script, or program used to take advantage of a vulnerability", "A backup process", "A user access control"], a: 1},
            {q: "What threat modeling framework categorizes threats into: Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege?", o: ["DREAD", "STRIDE", "PASTA", "OWASP"], a: 1},
            {q: "Which security control is an example of a detective control?", o: ["Firewall", "Intrusion Detection System (IDS)", "Enforcing strong passwords", "File encryption"], a: 1},
            {q: "What is social engineering?", o: ["Compiling code on social networks", "Manipulating individuals into revealing confidential information", "Configuring network switches", "Creating database backups"], a: 1},
            {q: "What represents the total sum of all vulnerabilities that an attacker can exploit in a system?", o: ["Attack surface", "Threat vector", "Risk score", "Exploit chain"], a: 0}
        ]
    });

    // 2. Symmetric Cryptography
    quizzes.push({
        title: "Symmetric Key Cryptography",
        questions: [
            {q: "What defines symmetric key cryptography?", o: ["Uses two different keys for encryption and decryption", "Uses the same shared secret key for both encryption and decryption", "Does not use keys", "Uses public keys only"], a: 1},
            {q: "Which algorithm is the current industry standard for symmetric encryption?", o: ["DES", "AES (Advanced Encryption Standard)", "RSA", "Diffie-Hellman"], a: 1},
            {q: "What block size does AES use?", o: ["64 bits", "128 bits", "192 bits", "256 bits"], a: 1},
            {q: "What key sizes does AES support?", o: ["64, 128, 256 bits", "128, 192, 256 bits", "256, 512, 1024 bits", "56, 112, 168 bits"], a: 1},
            {q: "Which symmetric cipher is a legacy algorithm that was cracked due to its small 56-bit key size?", o: ["AES", "DES", "Blowfish", "RC4"], a: 1},
            {q: "What is the difference between a block cipher and a stream cipher?", o: ["Block cipher encrypts one bit at a time; stream encrypts fixed blocks", "Block cipher encrypts fixed-size blocks of data; stream encrypts data bit-by-bit or byte-by-byte", "Block cipher is symmetric; stream is symmetric", "Stream cipher is slower"], a: 1},
            {q: "Which mode of block cipher operation encrypts each block independently, making it prone to pattern leakage?", o: ["Cipher Block Chaining (CBC)", "Electronic Codebook (ECB)", "Counter Mode (CTR)", "Cipher Feedback (CFB)"], a: 1},
            {q: "In CBC mode, what is the role of the Initialization Vector (IV)?", o: ["To sign the message", "To ensure that encrypting the same plaintext twice with the same key yields different ciphertexts", "To generate the secret key", "To compress the data block"], a: 1},
            {q: "Which symmetric key distribution method is highly secure and based on public key cryptography?", o: ["Sending keys over email", "Diffie-Hellman Key Exchange", "Storing keys in database", "Hardcoding keys"], a: 1},
            {q: "What is the primary challenge of symmetric cryptography in large networks?", o: ["Slow execution speed", "Secure key distribution and key management scalability (requires N*(N-1)/2 keys)", "High CPU utilization", "Lack of strong algorithms"], a: 1}
        ]
    });

    // 3. Asymmetric Cryptography
    quizzes.push({
        title: "Asymmetric Cryptography & RSA",
        questions: [
            {q: "What defines asymmetric cryptography?", o: ["Uses a single shared key", "Uses a mathematically related key pair: public key for encryption, private key for decryption", "Uses hash functions", "Does not require keys"], a: 1},
            {q: "Which asymmetric algorithm is widely used and based on the mathematical difficulty of factoring large prime numbers?", o: ["AES", "RSA", "Blowfish", "SHA-256"], a: 1},
            {q: "If Alice wants to send an encrypted message to Bob, which key should she use to encrypt the message?", o: ["Alices private key", "Alices public key", "Bobs public key", "Bobs private key"], a: 2},
            {q: "Which key must Bob use to decrypt the message encrypted with Bob's public key?", o: ["Alices public key", "Bobs public key", "Bobs private key", "Alices private key"], a: 2},
            {q: "Which asymmetric algorithm is based on algebraic structures over finite fields, offering smaller key sizes with comparable security?", o: ["RSA", "Diffie-Hellman", "Elliptic Curve Cryptography (ECC)", "AES"], a: 2},
            {q: "To create a digital signature, which key does the sender encrypt the hash of the message with?", o: ["Senders private key", "Senders public key", "Receivers public key", "Receivers private key"], a: 0},
            {q: "How does a receiver verify a digital signature?", o: ["Decrypts signature using their own private key", "Decrypts signature using the senders public key and compares the hashes", "Re-hashes the signature", "Sends a request to CA"], a: 1},
            {q: "What is the main disadvantage of asymmetric cryptography compared to symmetric?", o: ["Lacks key exchange capabilities", "Computationally slow and resource-intensive", "Shorter key sizes", "Weak mathematical foundations"], a: 1},
            {q: "Which algorithm is primarily designed for secure key exchange, rather than direct encryption/decryption of data?", "o": ["RSA", "Diffie-Hellman", "AES", "MD5"], a: 1},
            {q: "Which key pair is shared openly with the world?", o: ["Private key", "Public key", "Symmetric key", "Session key"], a: 1}
        ]
    });

    // 4. Hash Functions
    quizzes.push({
        title: "Hash Functions & Data Integrity",
        questions: [
            {q: "What is a core property of cryptographic hash functions?", o: ["Reversible encryption", "One-way mapping (impossible to reverse to find inputs)", "Requires a public key", "Variable length outputs"], a: 1},
            {q: "What does a collision in hash functions represent?", o: ["The server crashes during hashing", "Two different inputs produce the exact same hash output", "A hash output is empty", "A key is lost in network transit"], a: 1},
            {q: "Which hash algorithm has been proven insecure due to collision vulnerabilities?", o: ["SHA-256", "MD5 / SHA-1", "bcrypt", "PBKDF2"], a: 1},
            {q: "What is the bit length of a SHA-256 hash output?", o: ["128 bits", "160 bits", "256 bits", "512 bits"], a: 2},
            {q: "What is 'salting' in the context of password hashing?", o: ["Encrypting the database", "Appending a unique random value to the password before hashing to prevent rainbow table attacks", "Encoding the hash with Base64", "Changing the hashing algorithm round count"], a: 1},
            {q: "What is a Rainbow Table?", o: ["A database containing user roles", "A precomputed table of plaintext passwords and their corresponding hashes", "A network routing table", "An encryption keys catalog"], a: 1},
            {q: "What hashing algorithm is specifically designed to be slow and compute-heavy to resist brute-force attacks?", o: ["MD5", "SHA-256", "bcrypt / Argon2", "CRC32"], a: 2},
            {q: "What does HMACS stand for?", o: ["Hash-based Message Authentication Code", "Header Message Access Control System", "Hybrid Message Authorization Cipher", "Hypertext Message Active Code Standard"], a: 0},
            {q: "HMAC incorporates which additional element alongside the message to verify authenticity?", o: ["A public key", "A secret cryptographic key", "A digital certificate", "A session cookie"], a: 1},
            {q: "Does changing one character in a 1MB file affect the SHA-256 hash?", o: ["No, it remains mostly identical", "Yes, it produces a completely different hash (avalanche effect)", "The hash becomes shorter", "The hash calculation fails"], a: 1}
        ]
    });

    // 5. Certificates & PKI
    quizzes.push({
        title: "PKI & Digital Certificates",
        questions: [
            {q: "What does PKI stand for?", o: ["Private Key Integrity", "Public Key Infrastructure", "Public Key Interface", "Privacy Key Installation"], a: 1},
            {q: "What is the primary role of a Certificate Authority (CA)?", o: ["Routing network packets", "Digitally signing and issuing public key certificates to verify identities", "Hosting websites", "Storing private keys"], a: 1},
            {q: "Which standard format is widely used for digital certificates?", o: ["X.509", "RFC 2616", "JSON", "ASCII"], a: 0},
            {q: "What does a digital certificate contain?", o: ["The private key of the owner", "The public key of the entity and the digital signature of the CA", "The user passwords", "The web server logs"], a: 1},
            {q: "How does a browser verify that an SSL certificate is trusted?", o: ["Checks its local database of root certificates of trusted CAs", "Asks the user to confirm", "Symmetric decryption of the site", "Downloads the private key"], a: 0},
            {q: "What is a Certificate Revocation List (CRL)?", o: ["A list of expired certificates", "A list of certificates revoked by the CA before their expiration date", "A list of trusted websites", "A user access list"], a: 1},
            {q: "Which protocol is a faster alternative to CRL for checking certificate revocation status in real-time?", o: ["HTTP", "OCSP (Online Certificate Status Protocol)", "LDAP", "SMTP"], a: 1},
            {q: "What is Wildcard SSL certificate?", o: ["A free certificate", "A certificate that secures a domain and all its subdomains (*.domain.com)", "A certificate for multiple root domains", "A certificate with no key"], a: 1},
            {q: "What happens in a Man-in-the-Middle (MITM) attack if PKI is absent?", o: ["The attacker cannot read data", "The attacker can intercept keys and masquerade as the destination server undetected", "The connection is immediately dropped", "Data is encrypted automatically"], a: 1},
            {q: "What is a self-signed certificate?", o: ["A certificate signed by an established CA", "A certificate signed by the entity that created it, rather than a trusted CA", "An invalid certificate", "A certificate that does not use encryption"], a: 1}
        ]
    });

    // 6. IPsec & VPNs
    quizzes.push({
        title: "IPsec Protocols & VPN Security",
        questions: [
            {q: "What does VPN stand for?", o: ["Virtual Private Network", "Virtual Protocol Node", "Verified Privacy Network", "Variable Port Network"], a: 0},
            {q: "At which layer of the OSI model does IPsec operate?", o: ["Data Link Layer", "Network Layer", "Transport Layer", "Application Layer"], a: 1},
            {q: "Which IPsec protocol provides data integrity and authentication but NO confidentiality (no encryption)?", o: ["ESP (Encapsulating Security Payload)", "AH (Authentication Header)", "IKE (Internet Key Exchange)", "SSL"], a: 1},
            {q: "Which IPsec protocol provides encryption, authentication, and integrity?", o: ["AH", "ESP", "IKE", "TLS"], a: 1},
            {q: "In which IPsec mode is the entire original IP packet encrypted and encapsulated inside a new IP packet?", o: ["Transport Mode", "Tunnel Mode", "Bridge Mode", "Gateway Mode"], a: 1},
            {q: "In which IPsec mode is only the payload of the IP packet encrypted, leaving the original headers intact?", o: ["Tunnel Mode", "Transport Mode", "Direct Mode", "Pass-through Mode"], a: 1},
            {q: "Which protocol handles key negotiation and Security Association (SA) establishment for IPsec?", o: ["ESP", "AH", "IKE (Internet Key Exchange)", "L2TP"], a: 2},
            {q: "What is a Security Association (SA) in IPsec?", o: ["A legal security firm", "A set of agreed security parameters and keys shared between two communicating peers", "A digital certificate", "A network routing rule"], a: 1},
            {q: "Which VPN type is commonly used for browser-to-server security without installing client software?", o: ["IPsec VPN", "SSL/TLS VPN", "L2TP VPN", "PPTP VPN"], a: 1},
            {q: "What is split tunneling in VPNs?", o: ["Splitting packets into pieces", "Routing some traffic through the encrypted VPN tunnel while other traffic goes directly to the internet", "A form of encryption cracking", "Running two VPN connections simultaneously"], a: 1}
        ]
    });

    // 7. SSL/TLS Handshake
    quizzes.push({
        title: "SSL/TLS Handshake & Encryption",
        questions: [
            {q: "What is the primary purpose of TLS?", o: ["To speed up page loading", "To provide secure communication over a network using encryption", "To block SQL injections", "To manage domain names"], a: 1},
            {q: "Which message starts the SSL/TLS handshake?", o: ["ServerHello", "ClientHello", "ChangeCipherSpec", "Finished"], a: 1},
            {q: "In the TLS handshake, how does the client verify the server's identity?", o: ["The client requests the user's password", "The client receives and validates the server's SSL certificate", "The client runs a port scan", "The server encrypts the user's IP"], a: 1},
            {q: "What is the purpose of the 'ChangeCipherSpec' message in TLS?", o: ["To change the domain name", "To signal that subsequent messages will be encrypted with the negotiated keys", "To close the connection", "To request a new certificate"], a: 1},
            {q: "What are cipher suites?", o: ["Sets of physical servers", "Combinations of cryptographic algorithms used to establish secure connections", "Database query languages", "Types of firewalls"], a: 1},
            {q: "Which key exchange algorithm provides Perfect Forward Secrecy (PFS)?", o: ["Static RSA", "Diffie-Hellman Ephemeral (DHE / ECDHE)", "Symmetric AES", "MD5"], a: 1},
            {q: "What is Perfect Forward Secrecy (PFS)?", o: ["A system that never crashes", "A property ensuring that compromise of long-term private keys does not compromise past session keys", "Automatic password rotation", "Instant key generation"], a: 1},
            {q: "Which protocol succeeded SSL?", o: ["HTTPS", "TLS (Transport Layer Security)", "IPsec", "SSH"], a: 1},
            {q: "What does a cipher suite like 'TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256' define for hashing?", o: ["ECDHE", "RSA", "AES_128_GCM", "SHA256"], a: 3},
            {q: "At which OSI layer does TLS typically run?", o: ["Network Layer", "Transport Layer", "Presentation Layer", "Application Layer"], a: 1}
        ]
    });

    // 8. Firewalls & IDPS
    quizzes.push({
        title: "Firewalls & Intrusion Detection",
        questions: [
            {q: "What is a firewall?", o: ["A hardware cooling system", "A security system that monitors and controls incoming and outgoing network traffic based on rules", "An encryption algorithm", "A database backup server"], a: 1},
            {q: "Which firewall type inspects packets individually without keeping track of the connection state?", o: ["Stateful inspection firewall", "Stateless / Packet filtering firewall", "Application-level gateway", "Next-generation firewall"], a: 1},
            {q: "Which firewall type keeps track of the state of active network connections?", o: ["Packet filter", "Stateful Inspection Firewall", "Proxy Firewall", "Circuit-level Gateway"], a: 1},
            {q: "What is an Intrusion Detection System (IDS)?", o: ["A system that blocks all traffic", "A device or software application that monitors a network or systems for malicious activity or policy violations", "A file backup tool", "An encryption key generator"], a: 1},
            {q: "What is the primary difference between IDS and IPS?", "o": ["IDS runs on servers; IPS runs on routers", "IDS monitors and alerts; IPS monitors, alerts, and actively blocks/prevents threats", "IDS is hardware; IPS is software", "IDS encrypts; IPS decrypts"], a: 1},
            {q: "Which detection method matches traffic patterns against database profiles of known threats?", "o": ["Anomaly-based detection", "Signature-based detection", "Heuristic detection", "Stateful analysis"], a: 1},
            {q: "Which detection method identifies deviations from established baselines of normal network behavior?", "o": ["Signature-based detection", "Anomaly-based detection", "Policy-based detection", "Static analysis"], a: 1},
            {q: "A firewall that operates at Layer 7 (Application Layer) of the OSI model is called a:", o: ["Packet filter", "Circuit-level gateway", "Application-level gateway (Proxy Firewall)", "Stateful inspection firewall"], a: 2},
            {q: "What is a DMZ (Demilitarized Zone) in network security?", o: ["A highly encrypted server room", "A physical boundary between countries", "A subnetwork that exposes an organization's external-facing services to the untrusted internet", "A database recovery zone"], a: 2},
            {q: "Which system is built to attract attackers and analyze their behavior?", o: ["IDS", "Honeypot", "Firewall", "Valkyrie"], a: 1}
        ]
    });

    // 9. Web Vulnerabilities
    quizzes.push({
        title: "Web Application Security & OWASP",
        questions: [
            {q: "What is SQL Injection (SQLi)?", o: ["Inserting malicious SQL queries into user input fields to execute database commands", "Overloading database connections", "Deleting database files", "Encrypting database inputs"], a: 0},
            {q: "How can SQL injection be prevented?", o: ["Using client-side alert popups", "Using Parameterized Queries / Prepared Statements", "Increasing password length", "Restarting database servers"], a: 1},
            {q: "What is Cross-Site Scripting (XSS)?", o: ["Executing database commands", "Injecting malicious scripts into trusted websites that execute in a victim's browser", "Spoofing domain names", "Cracking server passwords"], a: 1},
            {q: "What does CSRF stand for?", o: ["Cross-Site Request Forgery", "Client-Side Routing Framework", "Common System Recovery Facility", "Cryptographic Security Request Form"], a: 0},
            {q: "How does a CSRF attack work?", o: ["By guessing the user password", "By tricking an authenticated user's browser into executing an unwanted action on a trusted site", "By stealing database records directly", "By overloading network bandwidth"], a: 1},
            {q: "Which token is used to prevent CSRF attacks?", o: ["Symmetric key token", "CSRF Token (a unique, secret value validated by the server)", "JWT token", "Session cookie"], a: 1},
            {q: "What is an IDOR (Insecure Direct Object Reference) vulnerability?", o: ["A form of DDoS", "A vulnerability where an application provides direct access to objects based on user-supplied input without access control checks", "An SQL syntax error", "An expired certificate"], a: 1},
            {q: "Which header helps block clickjacking attacks?", o: ["Content-Type", "X-Frame-Options / Content-Security-Policy (frame-ancestors)", "Authorization", "Accept-Encoding"], a: 1},
            {q: "Which type of XSS stores the malicious script on the server database permanently?", o: ["Reflected XSS", "Stored (Persistent) XSS", "DOM-based XSS", "Symmetric XSS"], a: 1},
            {q: "What is the primary action of a DoS (Denial of Service) attack?", o: ["Stealing user passwords", "Making a service unavailable by overwhelming it with traffic", "Modifying table rows", "Intercepting certificates"], a: 1}
        ]
    });

    // 10. Modern Security Architectures
    quizzes.push({
        title: "Modern Security Architectures & Zero Trust",
        questions: [
            {q: "What is the primary philosophy of a Zero Trust security model?", o: ["Trust but verify", "Never trust, always verify", "Trust all internal traffic", "Verify once on login"], a: 1},
            {q: "What does MFA stand for in security?", o: ["Multi-Factor Authentication", "Multiple File Access", "Main Frame Architecture", "Message Format Association"], a: 0},
            {q: "Which of the following is NOT a category of authentication factors?", o: ["Something you know (password)", "Something you have (token)", "Something you are (biometric)", "Somewhere you went (vacation destination)"], a: 3},
            {q: "What is Privilege Escalation?", o: ["Upgrading server RAM", "Gaining higher permissions/privileges than originally authorized", "Increasing network speed", "Encrypting database fields"], a: 1},
            {q: "What does IAM stand for in cloud and enterprise security?", o: ["Information Access Management", "Identity and Access Management", "Intelligent Authentication Module", "Internal Audit Metric"], a: 1},
            {q: "What is Least Privilege principle?", o: ["Giving users zero permissions", "Giving users the minimum level of access/privileges necessary to perform their job functions", "Giving all users admin access", "Rotating keys slowly"], a: 1},
            {q: "What is a major component of microsegmentation in network security?", o: ["Dividing a network into small, isolated security zones to control traffic flows in detail", "Buying smaller routers", "Using 56-bit ciphers", "Connecting multiple databases"], a: 0},
            {q: "What does SSO stand for?", o: ["Secure Socket Output", "Single Sign-On", "System Status Overview", "Symmetric Security Option"], a: 1},
            {q: "What does Single Sign-On (SSO) do?", o: ["Encrypts the computer", "Allows a user to log in once and access multiple related systems without re-entering credentials", "Limits logins to one device", "Changes passwords daily"], a: 1},
            {q: "In security auditing, what does 'threat hunting' refer to?", o: ["Scanning files for compilation errors", "Proactively searching networks for undetected cyber threats and malicious activities", "Installing firewalls", "Resetting user passwords"], a: 1}
        ]
    });
    
    return quizzes;
}

function generateJsQuizzes() {
    const quizzes = [];
    
    // 1. Execution context
    quizzes.push({
        title: "JS Engine & Execution Context",
        questions: [
            {q: "Where is JavaScript code parsed and executed?", o: ["The database", "The JS Engine (e.g. V8)", "The HTML file", "The file system"], a: 1},
            {q: "What are the two main phases of JS execution context?", o: ["Parsing and Compilation", "Creation phase and Execution phase", "Loading and Rendering", "Thread spawn and Garbage collection"], a: 1},
            {q: "What is the Call Stack?", o: ["Where objects are stored in memory", "A LIFO structure that tracks active function calls in JS", "A list of callback functions", "A network requests queue"], a: 1},
            {q: "What does JIT stand for in JS engines?", o: ["Just-in-Time compilation", "Javascript Integration Tool", "JSON Interface Type", "Joint Iteration Tracker"], a: 0},
            {q: "JavaScript is a single-threaded language, meaning:", o: ["It cannot run in browsers", "It has one call stack and can execute one command at a time", "It uses multiple cores natively", "It has no memory limits"], a: 1},
            {q: "Where are objects and dynamically allocated variables stored in JS?", o: ["Call Stack", "Memory Heap", "Task Queue", "Event Loop"], a: 1},
            {q: "What represents the global execution context in a web browser?", o: ["document", "window", "global", "console"], a: 1},
            {q: "What represents the global execution context in Node.js?", o: ["window", "global", "process", "module"], a: 1},
            {q: "What happens when the Call Stack exceeds its maximum size?", o: ["Memory leak", "Stack Overflow error", "The browser closes", "Garbage collection is triggered"], a: 1},
            {q: "What does V8 do with JavaScript code?", o: ["Styles the elements", "Compiles JS directly to native machine code using JIT", "Converts JS to Python", "Saves it to a database"], a: 1}
        ]
    });

    // 2. Scope & Closures
    quizzes.push({
        title: "Scope, Closures & Hoisting",
        questions: [
            {q: "What is Hoisting in JavaScript?", o: ["Moving elements in the DOM", "Variable and function declarations are put into memory during the creation phase before execution", "Deallocating memory", "Translating code to ES5"], a: 1},
            {q: "Are variables declared with 'let' and 'const' hoisted?", o: ["No, never", "Yes, but they are in the Temporal Dead Zone (TDZ) and cannot be accessed before declaration", "Yes, and initialized to undefined", "Yes, and initialized to null"], a: 1},
            {q: "What is the scope of variables declared with 'var'?", o: ["Block scope", "Function (or Global) scope", "Module scope", "No scope"], a: 1},
            {q: "What is the scope of variables declared with 'let' and 'const'?", o: ["Function scope", "Block scope", "Global scope only", "Dynamic scope"], a: 1},
            {q: "What is a Closure in JavaScript?", o: ["Closing a browser tab", "A function that has access to its outer lexical scope variables even after the outer function has returned", "A method to compress files", "A private class constructor"], a: 1},
            {q: "What is lexical scope?", o: ["Scope determined at runtime", "Scope determined by where variables and blocks are physically written in the source code at compile time", "Dynamic scope", "Global scope"], a: 1},
            {q: "What is the Temporal Dead Zone (TDZ)?", o: ["The time when the browser freezes", "The period between variable entry into scope and its actual declaration where it cannot be accessed", "The garbage collection cycle", "The event loop latency"], a: 1},
            {q: "What is the output of declaring a variable without var, let, or const (e.g. x = 5) in non-strict mode?", o: ["Syntax Error", "Creates a global variable x", "Local variable x", "Undefined"], a: 1},
            {q: "What happens if you re-declare a let variable in the same scope?", o: ["It is overwritten", "SyntaxError", "It is ignored", "Undefined"], a: 1},
            {q: "Which keyword prevents variable reassignment but allows object property mutations?", o: ["var", "let", "const", "readonly"], a: 2}
        ]
    });

    // 3. Prototypes & Classes
    quizzes.push({
        title: "Prototypes & OOP",
        questions: [
            {q: "JavaScript uses prototypal inheritance. What does this mean?", o: ["Objects inherit properties directly from other objects via a prototype link", "Classes are compiled to C++", "Inheritance is not supported", "Every object is copied"], a: 0},
            {q: "Which property points to an object's prototype link in modern browsers?", o: ["prototype", "__proto__", "parent", "super"], a: 1},
            {q: "What is the top-level object in the prototype chain from which almost all objects inherit?", o: ["Function.prototype", "Object.prototype", "Array.prototype", "null"], a: 1},
            {q: "What is the value of the prototype link at the end of the prototype chain?", o: ["undefined", "Object", "null", "NaN"], a: 2},
            {q: "How does the JS engine search for a property on an object?", o: ["Checks the object itself first, then recursively follows the prototype chain until found or null is reached", "Checks the global scope only", "Does a full database scan", "Checks parent classes only"], a: 0},
            {q: "How do you create an object with a specified prototype in JS?", o: ["Object.create(proto)", "new Object()", "Object.set(proto)", "Object.prototype = proto"], a: 0},
            {q: "What does the 'new' keyword do?", o: ["Deletes an object", "Creates a new empty object, links __proto__ to the constructor function's prototype, and calls the constructor with 'this' set to the new object", "Loads a script", "Saves to memory heap"], a: 1},
            {q: "Are JavaScript classes actual classes like in Java?", o: ["Yes, fully native", "No, they are syntactical sugar over JavaScript's existing prototype-based inheritance", "Yes, they run on threads", "No, they are converted to arrays"], a: 1},
            {q: "Which method is called automatically when instantiating a class using new?", o: ["init()", "constructor()", "create()", "setup()"], a: 1},
            {q: "How does a child class call the parent class constructor in JS?", o: ["parent()", "super()", "this.parent()", "constructor.call()"], a: 1}
        ]
    });

    // 4. Functional JS
    quizzes.push({
        title: "Functional Programming Patterns",
        questions: [
            {q: "What is a Pure Function?", o: ["A function with no arguments", "A function that always returns the same output for the same input and has no side effects", "A function containing only math operations", "A built-in JS function"], a: 1},
            {q: "Which array method creates a new array with all elements that pass a test?", o: ["map()", "filter()", "reduce()", "forEach()"], a: 1},
            {q: "Which array method applies a function against an accumulator to reduce the array to a single value?", o: ["map()", "filter()", "reduce()", "slice()"], a: 2},
            {q: "What is Currying in functional programming?", o: ["Adding styles to a function", "Translating a function that takes multiple arguments into a sequence of functions that each take a single argument", "Calling a function recursively", "Caching function results"], a: 1},
            {q: "Which method creates a new function that, when called, has its 'this' keyword set to the provided value?", o: ["call()", "apply()", "bind()", "set()"], a: 2},
            {q: "What is the difference between call() and apply()?", o: ["call takes an array of arguments; apply takes comma-separated arguments", "call takes comma-separated arguments; apply takes an array of arguments", "call is async; apply is sync", "No difference"], a: 1},
            {q: "What is a Higher-Order Function?", o: ["A function that runs faster", "A function that takes one or more functions as arguments, or returns a function as its result", "A function declared in global scope", "A function with high priority"], a: 1},
            {q: "What is function composition?", o: ["Writing long functions", "Combining two or more functions to produce a new function", "Splitting a function into blocks", "Testing a function"], a: 1},
            {q: "Are JavaScript arrays passed by value or reference to functions?", o: ["By value", "By reference", "Both", "Depends on array size"], a: 1},
            {q: "Which operator is used to unpack elements of an array or properties of an object in ES6?", o: ["Rest operator", "Spread operator (...)", "Destructuring operator", "Split operator"], a: 1}
        ]
    });

    // 5. Promises & Async
    quizzes.push({
        title: "Asynchronous JS & Promises",
        questions: [
            {q: "What are the three possible states of a JavaScript Promise?", o: ["Active, Inactive, Completed", "Pending, Fulfilled, Rejected", "Loading, Loaded, Failed", "Started, Running, Finished"], a: 1},
            {q: "What method is called when a Promise is successfully resolved?", o: ["catch()", "then()", "finally()", "resolve()"], a: 1},
            {q: "What method handles errors or rejections in a Promise chain?", o: ["then()", "catch()", "finally()", "error()"], a: 1},
            {q: "Which Promise method resolves when ALL of the input promises resolve, and rejects if ANY promise rejects?", o: ["Promise.race()", "Promise.all()", "Promise.any()", "Promise.allSettled()"], a: 1},
            {q: "Which Promise method resolves or rejects as soon as the FIRST promise in the input settles?", o: ["Promise.all()", "Promise.race()", "Promise.any()", "Promise.allSettled()"], a: 1},
            {q: "Which Promise method resolves when the first input promise is FULFILLED, ignoring rejections unless all reject?", o: ["Promise.all()", "Promise.any()", "Promise.race()", "Promise.allSettled()"], a: 1},
            {q: "What does Promise.allSettled() return?", o: ["The first resolved value", "An array of objects describing the outcome of each promise (fulfilled or rejected)", "A single string", "Throws an error if any rejects"], a: 1},
            {q: "Is a Promise execution synchronous or asynchronous when initialized?", o: ["The Promise executor function runs synchronously, but the callbacks (.then/.catch) are asynchronous", "Completely synchronous", "Completely asynchronous", "Depends on browser thread"], a: 0},
            {q: "What handles the execution of Promise callbacks?", o: ["Task Queue", "Microtask Queue", "Render Queue", "Call Stack directly"], a: 1},
            {q: "Which queue has higher priority: Task Queue or Microtask Queue?", o: ["Task Queue", "Microtask Queue", "They have equal priority", "Depends on execution context"], a: 1}
        ]
    });

    // 6. Async/Await
    quizzes.push({
        title: "Async/Await Patterns",
        questions: [
            {q: "What does an 'async' function always return?", o: ["A string", "A Promise", "Undefined", "The value directly"], a: 1},
            {q: "The 'await' keyword can only be used inside:", o: ["Any JS function", "An async function (or at the top level of ES modules)", "A class constructor", "A loop block"], a: 1},
            {q: "How do you handle errors when using async/await?", o: ["Using .catch() callback only", "Using try...catch blocks", "Using window.onerror", "Errors are ignored automatically"], a: 1},
            {q: "What does 'await' do to the execution of the async function?", o: ["Freezes the entire browser thread", "Pauses execution of the async function until the awaited Promise resolves or rejects", "Cancels the promise", "Compiles the function"], a: 1},
            {q: "Can you use await outside of a function in standard scripts?", o: ["Yes, always", "No, it causes SyntaxError unless in a module", "Only in strict mode", "Only in Node.js v10"], a: 1},
            {q: "What function type is declared with an asterisk (function*) and can pause/resume execution?", o: ["Async function", "Generator function", "Arrow function", "Callback function"], a: 1},
            {q: "What keyword is used to yield values from a generator function?", o: ["return", "yield", "emit", "send"], a: 1},
            {q: "How do you iterate over values returned by a generator?", o: ["Using generator.next() or for...of loop", "Using map()", "Using foreach", "Using a standard while loop"], a: 0},
            {q: "What does calling next() on a generator return?", o: ["The value directly", "An object with fields: value and done", "A promise", "An array"], a: 1},
            {q: "Can you handle asynchronous streams using for await...of?", o: ["No, loop must be sync", "Yes, it is used to iterate over async iterables", "Only in Node.js", "Only with websockets"], a: 1}
        ]
    });

    // 7. Event Loop
    quizzes.push({
        title: "Event Loop & Task Queues",
        questions: [
            {q: "What is the primary role of the Event Loop?", o: ["Parsing HTML", "Monitoring the Call Stack and pushing tasks from the queues when the stack is empty", "Running garbage collection", "Managing database connections"], a: 1},
            {q: "Which of the following goes into the Microtask Queue?", o: ["setTimeout callback", "Promise then/catch callbacks and queueMicrotask", "setInterval callback", "DOM Click event listener"], a: 1},
            {q: "Which of the following goes into the Macrotask (Task) Queue?", o: ["Promise.resolve()", "setTimeout / setInterval callbacks and I/O tasks", "MutationObserver", "process.nextTick"], a: 1},
            {q: "When does the Event Loop check the task queues?", o: ["Every 1ms", "Only when the Call Stack is empty", "During thread pauses", "Continuously, interrupting active functions"], a: 1},
            {q: "What queue manages requestAnimationFrame callbacks in browsers?", o: ["Microtask Queue", "Render Queue / Animation Queue", "Macrotask Queue", "Heap Stack"], a: 1},
            {q: "What is the order of execution for: console.log, Promise.then, and setTimeout?", o: ["setTimeout -> Promise -> console.log", "console.log (sync) -> Promise (microtask) -> setTimeout (macrotask)", "Promise -> setTimeout -> console.log", "They run concurrently"], a: 1},
            {q: "What happens if a microtask schedules another microtask?", o: ["It goes to macrotask queue", "It runs immediately, potentially starving the macrotask queue and blocking rendering if recursive", "It is ignored", "Call stack crashes"], a: 1},
            {q: "Which browser API executes a callback during a browser's idle periods?", o: ["requestAnimationFrame", "requestIdleCallback", "setTimeout", "queueMicrotask"], a: 1},
            {q: "What Node.js API schedules callbacks to run immediately after the current operation finishes (before microtasks)?", o: ["setImmediate", "process.nextTick", "setTimeout", "queueMicrotask"], a: 1},
            {q: "Is the DOM rendered before or after the microtask queue is cleared?", o: ["Before", "After the microtask queue is completely empty", "Concurrently", "Independent of queues"], a: 1}
        ]
    });

    // 8. JS Modules
    quizzes.push({
        title: "JavaScript Modules (ESM vs CommonJS)",
        questions: [
            {q: "Which module system is standard in modern ES6+ JavaScript?", o: ["CommonJS", "ES Modules (ESM)", "AMD", "UMD"], a: 1},
            {q: "Which syntax is used to import a module in ES Modules?", o: ["const mod = require('mod')", "import mod from 'mod'", "include 'mod'", "loadModule('mod')"], a: 1},
            {q: "Which syntax is used to import a module in CommonJS (Node.js legacy)?", o: ["import mod from 'mod'", "const mod = require('mod')", "require.import('mod')", "using mod"], a: 1},
            {q: "Are ES Modules evaluated synchronously or asynchronously?", o: ["Synchronously", "Asynchronously (supporting top-level await)", "Depends on file size", "No evaluation"], a: 1},
            {q: "Can you use 'require' inside an ES Module (.mjs)?", o: ["Yes, always", "No, require is not defined in ES Modules", "Only in Node.js", "Only in strict mode"], a: 1},
            {q: "What is a default export in ES Modules?", o: ["An automatic export", "An export that can be imported with any name without curly braces", "A fallback key", "An export that cannot be modified"], a: 1},
            {q: "What is a named export?", o: ["An export using default keyword", "An export requiring curly braces and exact names during import", "An export that is global", "An export containing strings only"], a: 1},
            {q: "Which keyword is used to export items in CommonJS?", o: ["export default", "module.exports / exports", "export", "return"], a: 1},
            {q: "What is tree shaking?", o: ["Optimizing database rows", "Dead code elimination during compilation of ES Modules by removing unused exports", "Testing modules in parallel", "A security check"], a: 1},
            {q: "Are ES Module imports static or dynamic by default?", o: ["Static (analyzed at compile time)", "Dynamic (evaluated at runtime)", "Both", "Depends on bundler config"], a: 0}
        ]
    });

    // 9. Memory Management
    quizzes.push({
        title: "Memory Management & Leaks",
        questions: [
            {q: "How is memory managed in JavaScript?", o: ["Manual allocation and deallocation", "Automatic allocation and Garbage Collection", "No allocation limits", "Disk virtual paging"], a: 1},
            {q: "What is the primary algorithm used by modern JS garbage collectors?", o: ["Reference counting", "Mark-and-Sweep", "Copying collector", "Generational heap"], a: 1},
            {q: "What issue does the Reference Counting garbage collection algorithm fail to resolve?", o: ["Unused variables", "Circular references", "Large arrays", "Global scope"], a: 1},
            {q: "What is a memory leak?", o: ["A crash in database files", "Memory that is no longer needed by the app but is not released back to the system", "A file download error", "A security compromise"], a: 1},
            {q: "Which of the following is a common cause of memory leaks in JS?", o: ["Using let instead of var", "Forgotten timers (setInterval) and uncleared event listeners on deleted elements", "Using arrow functions", "Declaring functions"], a: 1},
            {q: "What type of Map allows its keys to be garbage collected if there are no other references to them?", o: ["Map", "WeakMap", "Set", "WeakSet"], a: 1},
            {q: "What values can be used as keys in a WeakMap?", o: ["Strings", "Numbers", "Objects", "Booleans"], a: 2},
            {q: "Are WeakMap keys enumerable?", o: ["Yes, using keys()", "No, WeakMap keys are not enumerable and cannot be looped", "Only in Node.js", "Only in strict mode"], a: 1},
            {q: "What happens to variables declared globally (on window) in terms of garbage collection?", o: ["They are collected immediately", "They are never collected as long as the page is open", "They are collected when function returns", "They are compressed"], a: 1},
            {q: "What tool in Chrome DevTools is used to find memory leaks?", o: ["Console", "Performance / Memory panel (heap snapshots)", "Network tab", "Elements tab"], a: 1}
        ]
    });

    // 10. Performance Tuning
    quizzes.push({
        title: "Advanced Performance Optimization",
        questions: [
            {q: "What is Debouncing?", o: ["Making elements bounce", "Grouping multiple sequential calls into a single execution after a delay of inactivity", "Caching network calls", "Splitting threads"], a: 1},
            {q: "What is Throttling?", o: ["Slowing down CPU speed", "Limiting the execution of a function to at most once in a specified time window", "Deleting memory heap", "Enforcing secure routes"], a: 1},
            {q: "Which pattern is best for optimizing scroll or resize event handlers?", o: ["Recursive calls", "Throttling", "Promises", "Try/catch"], a: 1},
            {q: "Which pattern is best for search autocomplete inputs?", o: ["Promises", "Debouncing", "Throttling", "Event bubbling"], a: 1},
            {q: "What are Web Workers?", o: ["Browser background plugins", "Script operations running in a background thread separate from the main execution thread", "Automated UI tests", "Node.js cluster processes"], a: 1},
            {q: "Can Web Workers manipulate the DOM directly?", o: ["Yes, always", "No, they have no access to the DOM or window object", "Only inside setTimeout", "Only in Chrome"], a: 1},
            {q: "How do Web Workers communicate with the main thread?", o: ["Shared database", "Message passing via postMessage() and onmessage event", "Global variables", "Cookies"], a: 1},
            {q: "What is code splitting?", o: ["Splitting a file in half", "Dividing application bundles into smaller chunks loaded on-demand (lazy loading)", "Using multiple git branches", "Writing modular scripts"], a: 1},
            {q: "Which optimization technique pre-computes and caches outputs of functions based on inputs?", o: ["Debouncing", "Memoization", "Throttling", "Minification"], a: 1},
            {q: "What does minification do?", o: ["Reduces image dimensions", "Removes whitespace, comments, and shortens variable names in source files to reduce download size", "Compresses server databases", "Speeds up CPU clock"], a: 1}
        ]
    });
    
    return quizzes;
}

function generateMobileQuizzes() {
    const quizzes = [];
    
    // 1. Mobile Ecosystems
    quizzes.push({
        title: "Mobile App Architecture Foundations",
        questions: [
            {q: "What are the two major mobile operating system ecosystems?", o: ["Windows and MacOS", "iOS and Android", "Linux and ChromeOS", "Ubuntu and Android"], a: 1},
            {q: "Which programming language is the primary choice for native Android development?", o: ["Swift", "Kotlin", "Java (legacy) and Kotlin", "Objective-C"], a: 2},
            {q: "Which programming language is the primary choice for native iOS development?", o: ["Java", "Kotlin", "Swift", "C#"], a: 2},
            {q: "What is a cross-platform mobile framework?", o: ["A database system", "A framework that allows compiling to both iOS and Android from a single codebase", "A web server package", "An operating system"], a: 1},
            {q: "Which of the following is a cross-platform mobile framework?", o: ["React", "React Native & Flutter", "Express", "Vite"], a: 1},
            {q: "What does hybrid app development typically rely on?", o: ["Native Swift compilation", "WebViews rendering HTML/CSS/JS inside a native container", "Direct hardware assembly", "Node.js servers on devices"], a: 1},
            {q: "Which mobile OS uses the Gradle build system?", o: ["iOS", "Android", "Windows Mobile", "Tizen"], a: 1},
            {q: "Which IDE is standard for native iOS development?", o: ["Android Studio", "Xcode", "Visual Studio", "VS Code"], a: 1},
            {q: "Which IDE is standard for native Android development?", o: ["Xcode", "Android Studio", "PyCharm", "WebStorm"], a: 1},
            {q: "What package manager is standard in iOS projects for integrating libraries?", o: ["NPM", "CocoaPods / Swift Package Manager (SPM)", "Gradle", "Maven"], a: 1}
        ]
    });

    // 2. React Native Basics
    quizzes.push({
        title: "React Native Layout & Elements",
        questions: [
            {q: "Which component in React Native is equivalent to HTML 'div'?", o: ["<Text>", "<View>", "<Image>", "<Container>"], a: 1},
            {q: "Which component in React Native is used to display text?", o: ["<Paragraph>", "<Text>", "<View>", "<Label>"], a: 1},
            {q: "How do you style elements in React Native?", o: ["Using CSS files", "Using StyleSheet.create() (CSS-in-JS)", "Using Tailwind only", "Inline HTML tags"], a: 1},
            {q: "Which layout engine is used by React Native by default?", o: ["CSS Grid", "Flexbox", "Floats", "Block layout"], a: 1},
            {q: "What is the default flex-direction in React Native?", o: ["row", "column", "row-reverse", "column-reverse"], a: 1},
            {q: "What React Native component displays an image?", o: ["<img>", "<Picture>", "<Image>", "<Photo>"], a: 2},
            {q: "Which component should be used to display a scrollable list of static elements?", o: ["<View>", "<ScrollView>", "<FlatList>", "<SectionList>"], a: 1},
            {q: "What is the core difference between React Native and React in the web?", o: ["RN does not use DOM elements like div/span; it maps to native UI components", "RN is synchronous", "RN uses Python", "No differences"], a: 0},
            {q: "Which CLI tool is commonly used to build React Native apps with ready-to-use workflows?", o: ["Vite", "Expo CLI", "Gradle", "CocoaPods"], a: 1},
            {q: "What is the purpose of SafeAreaView in React Native?", o: ["Saves app data safely", "Renders content within the safe boundaries of a device (avoiding notches and home indicators)", "Encrypts the screen", "Accelerates rendering"], a: 1}
        ]
    });

    // 3. React Native Advanced
    quizzes.push({
        title: "React Native Lists & Navigation",
        questions: [
            {q: "Which component is optimized for rendering large scrollable lists efficiently using recycling?", o: ["<ScrollView>", "<FlatList>", "<View>", "<ListView>"], a: 1},
            {q: "What prop in FlatList specifies the array of data to render?", o: ["renderItem", "data", "keyExtractor", "items"], a: 1},
            {q: "What prop in FlatList defines how each item in the list should be rendered?", o: ["data", "renderItem", "keyExtractor", "itemStyle"], a: 1},
            {q: "Which React Native navigation library is industry standard?", o: ["React Router", "React Navigation", "Express Router", "Expo Router only"], a: 1},
            {q: "What navigator provides a card transition where new screens are placed on top?", o: ["Tab Navigator", "Stack Navigator", "Drawer Navigator", "Switch Navigator"], a: 1},
            {q: "What navigator slides out from the side of the screen?", o: ["Stack Navigator", "Drawer Navigator", "Tab Navigator", "Material Navigator"], a: 1},
            {q: "What does the 'Bridge' in React Native do?", o: ["Connects two devices via Bluetooth", "Handles communication between JavaScript thread and Native (Java/Objective-C) threads", "Creates CSS files", "Interfaces the database"], a: 1},
            {q: "What is the new React Native architecture replacement for the bridge?", o: ["JSI (JavaScript Interface) / TurboModules", "Expo Go", "Hermes Engine", "Gradle API"], a: 0},
            {q: "What JavaScript engine was built by Facebook specifically for React Native to optimize start-up time?", o: ["V8", "Hermes", "SpiderMonkey", "Chakra"], a: 1},
            {q: "How does React Native handle click interactions?", o: ["onclick attribute", "Touchable components (e.g. Pressable, TouchableOpacity) onpress event", "href attribute", "onclick event"], a: 1}
        ]
    });

    // 4. Flutter Basics
    quizzes.push({
        title: "Flutter & Dart Fundamentals",
        questions: [
            {q: "What programming language is used to write Flutter applications?", o: ["JavaScript", "Dart", "Swift", "Kotlin"], a: 1},
            {q: "In Flutter, everything is a:", o: ["Component", "Widget", "Element", "View"], a: 1},
            {q: "Which widget is immutable and has no mutable state properties?", o: ["StatefulWidget", "StatelessWidget", "InheritedWidget", "Container"], a: 1},
            {q: "Which widget can rebuild dynamically when state changes?", o: ["StatelessWidget", "StatefulWidget", "Text", "Padding"], a: 1},
            {q: "Which function is the entry point of a Flutter application?", o: ["main()", "runApp()", "init()", "start()"], a: 0},
            {q: "Which command-line tool validates your local environment configuration for Flutter?", o: ["flutter diagnostics", "flutter doctor", "flutter status", "flutter check"], a: 1},
            {q: "What is the name of the package repository for Dart and Flutter libraries?", o: ["npm", "pub.dev", "maven", "cocoapods"], a: 1},
            {q: "Which file in Flutter projects manages dependencies and assets configurations?", o: ["package.json", "pubspec.yaml", "build.gradle", "config.xml"], a: 1},
            {q: "How does Flutter render UI elements onto the device screen?", o: ["It translates widgets to OEM native buttons", "It draws widgets directly onto a canvas using its own rendering engine (Impeller/Skia)", "It uses WebViews", "It compiles to HTML"], a: 1},
            {q: "Which method in a State class is called once when the state object is created?", o: ["build()", "initState()", "dispose()", "setState()"], a: 1}
        ]
    });

    // 5. Flutter Advanced
    quizzes.push({
        title: "Flutter UI & Layout",
        questions: [
            {q: "Which layout widget arranges children vertically in Flutter?", o: ["Row", "Column", "Stack", "ListView"], a: 1},
            {q: "Which layout widget arranges children horizontally?", o: ["Column", "Row", "Wrap", "Stack"], a: 1},
            {q: "Which layout widget allows placing widgets on top of each other?", o: ["Row", "Column", "Stack", "Container"], a: 2},
            {q: "Which layout widget is designed to display a scrollable list of widgets?", o: ["Column", "ListView", "Container", "Grid"], a: 1},
            {q: "What is the purpose of the Scaffold widget?", o: ["To build database tables", "Provides a default structure/layout for a screen (AppBar, Drawer, FloatingActionButton, Body)", "To test the application", "To sign the APK"], a: 1},
            {q: "Which widget is used to add spacing, padding, margins, or backgrounds to a single child?", o: ["Row", "Column", "Container", "Stack"], a: 2},
            {q: "What does hot reload do in Flutter?", o: ["Restarts the app from scratch", "Injects updated source files into the running Dart VM immediately without losing state", "Recompiles the APK", "Uploads changes to App Store"], a: 1},
            {q: "What is the difference between Hot Reload and Hot Restart in Flutter?", o: ["Hot Restart compiles slower", "Hot Reload keeps state; Hot Restart resets state and runs main() again", "Hot Restart is for web only", "No difference"], a: 1},
            {q: "Which method must be called to notify the framework that a state has changed in a StatefulWidget?", o: ["build()", "setState()", "update()", "refresh()"], a: 1},
            {q: "Which widget constraints its child's width and height?", o: ["SizedBox", "Padding", "Row", "Center"], a: 0}
        ]
    });

    // 6. Flutter State Management
    quizzes.push({
        title: "Flutter State Management",
        questions: [
            {q: "Why is state management needed in Flutter?", o: ["To connect to internet", "To share data and coordinate state updates across different screens/widgets cleanly", "To run animations", "To build Gradle projects"], a: 1},
            {q: "Which built-in widget propagates information down the widget tree?", o: ["StatelessWidget", "InheritedWidget", "Container", "Scaffold"], a: 1},
            {q: "Which state management solution is officially recommended for beginners by the Flutter team?", o: ["Redux", "Provider", "GetX", "Bloc"], a: 1},
            {q: "In Provider, which class is extended to notify listeners of changes?", o: ["ChangeNotifier", "Listenable", "StatefulWidget", "Stream"], a: 0},
            {q: "Which method triggers listener callbacks in a ChangeNotifier?", o: ["update()", "notifyListeners()", "setState()", "refresh()"], a: 1},
            {q: "What state management pattern separates business logic from UI using Streams?", o: ["Provider", "BLoC (Business Logic Component)", "Redux", "MVC"], a: 1},
            {q: "Which widget in BLoC builds UI in response to new states?", o: ["BlocProvider", "BlocBuilder", "BlocListener", "StreamBuilder"], a: 1},
            {q: "Which package is a modern, compile-safe alternative to Provider?", o: ["GetX", "Riverpod", "Bloc", "MobX"], a: 1},
            {q: "What class in Riverpod is used to access providers?", o: ["WidgetRef", "BuildContext", "ProviderScope", "Consumer"], a: 0},
            {q: "What widget must wrap the entire app to use Riverpod or Provider?", o: ["MaterialApp", "ProviderScope / MultiProvider", "Scaffold", "Container"], a: 1}
        ]
    });

    // 7. Local Storage
    quizzes.push({
        title: "Mobile Local Storage",
        questions: [
            {q: "Where should lightweight key-value configurations be stored in React Native?", o: ["SQLite", "AsyncStorage", "File system", "Redux store"], a: 1},
            {q: "Is AsyncStorage synchronous or asynchronous?", o: ["Synchronous", "Asynchronous", "Both", "Depends on OS"], a: 1},
            {q: "What library provides a fully relational SQL database on mobile devices?", o: ["AsyncStorage", "SQLite", "Realm", "SharedPreferences"], a: 1},
            {q: "Which local database is a lightweight, fast, no-SQL object database alternative to SQLite?", o: ["SQLite", "Realm / Hive", "PostgreSQL", "Redis"], a: 1},
            {q: "What package is used to encrypt sensitive keys or tokens on iOS and Android?", o: ["AsyncStorage", "Secure Store (Expo) / Keychain (iOS) & Keystore (Android)", "SQLite", "Redux"], a: 1},
            {q: "Which Android class does AsyncStorage wrap natively?", o: ["CoreData", "SharedPreferences / SQLite", "Keychain", "PreferencesDataStore"], a: 1},
            {q: "Which iOS database system is native and object-oriented?", o: ["SQLite", "CoreData", "SharedPreferences", "Realm"], a: 1},
            {q: "How is data serialized before storing in AsyncStorage?", o: ["As XML", "As JSON string", "As binary", "As byte array"], a: 1},
            {q: "Which database is popular in Flutter for fast key-value storage written in pure Dart?", o: ["SQLite", "Hive", "Realm", "AsyncStorage"], a: 1},
            {q: "What is a main disadvantage of AsyncStorage?", o: ["Slow read speeds", "Not suitable for large, complex datasets due to lack of indexing and relational queries", "Requires internet", "Clears on app close"], a: 1}
        ]
    });

    // 8. Network Calls
    quizzes.push({
        title: "Mobile Networking & Sync",
        questions: [
            {q: "Which API client is built into the JavaScript runtime of React Native?", o: ["Axios", "fetch", "HttpClient", "Ajax"], a: 1},
            {q: "Which Dart package is highly popular for making HTTP requests in Flutter?", o: ["http / dio", "fetch", "Axios", "RESTClient"], a: 0},
            {q: "How do mobile apps detect internet availability changes?", o: ["By checking every 1s", "NetInfo (React Native) / Connectivity (Flutter) APIs", "By sending dummy emails", "By pinging database"], a: 1},
            {q: "What is offline-first application design?", o: ["App doesn't support internet", "App stores data locally first and synchronizes with server when connection is available", "App runs only on local servers", "No data is saved on devices"], a: 1},
            {q: "What represents the payload format of mobile network API responses typically?", o: ["XML", "JSON", "Protobuf", "HTML"], a: 1},
            {q: "Which status code represents a successful API response?", o: ["400", "200 OK", "301", "500"], a: 1},
            {q: "How do apps authenticate securely with backend APIs?", o: ["Sending passwords in plain text", "JWT / OAuth tokens in Authorization headers", "Sending IP address", "Using MAC address"], a: 1},
            {q: "What protocol allows real-time two-way communication in mobile apps?", o: ["HTTP", "WebSockets", "FTP", "SMTP"], a: 1},
            {q: "What library is used in React Native for query caching and server state synchronization?", o: ["Redux", "React Query (TanStack Query)", "Context API", "Axios"], a: 1},
            {q: "What security header prevents API requests from being tampered with?", o: ["User-Agent", "Authorization / Signature headers", "Content-Type", "Accept"], a: 1}
        ]
    });

    // 9. Push Notifications
    quizzes.push({
        title: "Push Notifications & Messaging",
        questions: [
            {q: "What does FCM stand for?", o: ["Firebase Cloud Messaging", "Flutter Core Module", "Fast Connection Manager", "File Communication Metric"], a: 0},
            {q: "Which service manages push notifications natively for iOS devices?", o: ["FCM", "APNs (Apple Push Notification service)", "AWS SNS", "OneSignal"], a: 1},
            {q: "Which service manages push notifications natively for Android devices?", o: ["APNs", "FCM (Firebase Cloud Messaging)", "GCM", "Expo Go"], a: 1},
            {q: "What are local notifications?", o: ["Notifications sent by server database", "Notifications triggered locally by the app based on time/triggers without server involvement", "Notifications for local users", "Notifications over Bluetooth"], a: 1},
            {q: "What token uniquely identifies a device for push notification routing?", o: ["JWT Token", "FCM Device Token", "Session ID", "MAC Address"], a: 1},
            {q: "What happens when a user clicks a push notification when the app is closed?", o: ["The app crashes", "The app launches, triggering callback handlers with the payload", "Nothing", "The phone reboots"], a: 1},
            {q: "Do push notifications require user permission in iOS?", o: ["No, automatic", "Yes, explicit permission is mandatory", "Only for paid apps", "Only on older iOS versions"], a: 1},
            {q: "What package is commonly used in React Native for local notifications?", o: ["react-native-local", "expo-notifications / react-native-push-notification", "react-native-alert", "fcm-client"], a: 1},
            {q: "What is a notification channel in Android?", o: ["A TV channel", "A categorization system allowing users to configure settings for different types of notifications", "A database table", "A network bandwidth slot"], a: 1},
            {q: "Which cloud service acts as a single provider wrapping both APNs and FCM?", o: ["Google Cloud Storage", "OneSignal / AWS Pinpoint", "Redis", "Heroku"], a: 1}
        ]
    });

    // 10. App Deployment
    quizzes.push({
        title: "Mobile App Store Deployment",
        questions: [
            {q: "What build output file is used to install apps on Android devices directly?", o: ["IPA", "APK", "EXE", "DMG"], a: 1},
            {q: "What is the modern publishing format for Google Play Store that replaces APK?", o: ["AAB (Android App Bundle)", "APK Bundle", "JAR", "ZIP"], a: 0},
            {q: "What build output file format is standard for iOS app store submissions?", o: ["APK", "IPA", "APP", "AAB"], a: 1},
            {q: "What is Apple's beta testing platform for iOS apps?", o: ["Play Console", "TestFlight", "App Center", "Firebase Beta"], a: 1},
            {q: "What credential file is used to sign iOS applications for release?", o: ["Keystore", "Provisioning Profile and Distribution Certificate", "Gradle file", "Info.plist"], a: 1},
            {q: "What security file contains the private key used to sign Android release apps?", o: ["Info.plist", "Keystore file", "gradle.properties", "AndroidManifest.xml"], a: 1},
            {q: "Which tool automates mobile builds, screenshot generation, and releases?", o: ["Vite", "Fastlane", "Gradle CLI", "Webpack"], a: 1},
            {q: "What file in iOS contains configuration metadata like permissions declarations (e.g. camera access)?", o: ["AndroidManifest.xml", "Info.plist", "Podfile", "project.pbxproj"], a: 1},
            {q: "What file in Android contains permissions declarations and app structure declarations?", o: ["build.gradle", "AndroidManifest.xml", "settings.gradle", "MainActivity.java"], a: 1},
            {q: "What is the Google Play Console used for?", o: ["Writing Kotlin code", "Uploading and publishing Android apps, monitoring crashes and analytics", "Hosting Node.js servers", "Designing app UI"], a: 1}
        ]
    });
    
    return quizzes;
}

function generateDevopsQuizzes() {
    const quizzes = [];
    
    // 1. DevOps & CI/CD
    quizzes.push({
        title: "DevOps & CI/CD Pipelines",
        questions: [
            {q: "What is the primary goal of DevOps?", o: ["Writing more code", "Shortening systems development life cycle and providing continuous delivery with high quality", "Replacing developers with managers", "Eliminating database engines"], a: 1},
            {q: "What does CI in CI/CD represent?", o: ["Cloud Integration", "Continuous Integration", "Code Inspection", "Container Instance"], a: 1},
            {q: "What does CD in CI/CD represent?", o: ["Code Delivery", "Continuous Delivery or Continuous Deployment", "Cloud Deployment", "Container Distribution"], a: 1},
            {q: "In Continuous Integration, developers merge code changes back to main branch:", o: ["Once a month", "Frequently (daily or multiple times a day), triggering automated builds and tests", "Only after project completion", "Whenever they want without testing"], a: 1},
            {q: "What is the difference between Continuous Delivery and Continuous Deployment?", o: ["Continuous Delivery has automated deployment to production; Continuous Deployment is manual", "Continuous Delivery has a manual approval step before production; Continuous Deployment deploys automatically", "Continuous Delivery is faster", "There is no difference"], a: 1},
            {q: "Which tool is a popular open-source automation server for CI/CD?", o: ["Docker", "Jenkins", "Kubernetes", "Prometheus"], a: 1},
            {q: "In GitHub Actions, workflows are defined using which file format?", o: ["JSON", "YAML", "XML", "TOML"], a: 1},
            {q: "What triggers a workflow run in GitHub Actions?", o: ["Database changes", "Events like push, pull request, or issue creation", "Manual compiles only", "Browser page loads"], a: 1},
            {q: "What is a runner in GitHub Actions?", o: ["A software developer", "A virtual machine or container that executes the workflow jobs", "A database index", "A web server port"], a: 1},
            {q: "Which pipeline stage checks code compliance against stylistic rules?", o: ["Unit testing", "Linting", "Packaging", "Deployment"], a: 1}
        ]
    });

    // 2. Git & Workflows
    quizzes.push({
        title: "Git Version Control Workflows",
        questions: [
            {q: "Which command initializes a new Git repository?", o: ["git start", "git init", "git new", "git setup"], a: 1},
            {q: "What does 'git add' do?", o: ["Saves changes to server", "Moves changes from working directory to staging area", "Creates a new branch", "Merges branches"], a: 1},
            {q: "What does 'git commit' do?", o: ["Pushes code to GitHub", "Saves staged changes to local repository history", "Deletes branches", "Checks out files"], a: 1},
            {q: "What is the difference between git merge and git rebase?", o: ["Merge creates a new commit preserving history structure; rebase moves/rewrites commits to top of target branch", "Merge deletes history", "Rebase is slower", "Merge is only for remote repositories"], a: 0},
            {q: "Which branching strategy relies on long-lived master/develop branches and release/feature branches?", o: ["Trunk-Based Development", "Gitflow Workflow", "GitHub Flow", "Forking Workflow"], a: 1},
            {q: "Which branching strategy has developers commit to a single 'trunk' branch frequently?", o: ["Gitflow", "Trunk-Based Development", "Feature branching", "Forking Workflow"], a: 1},
            {q: "What is a git hook?", o: ["A graphical interface", "Scripts that Git executes locally before or after events like commit, push, or receive", "A way to link repositories", "An encryption key"], a: 1},
            {q: "Which tool is commonly used to manage local Git hooks in JS projects?", o: ["Webpack", "Husky", "Babel", "Vite"], a: 1},
            {q: "What does 'git pull' do under the hood?", o: ["git push + git merge", "git fetch + git merge", "git clone + git checkout", "git commit + git push"], a: 1},
            {q: "What does a merge conflict mean in Git?", o: ["The server is down", "Git cannot resolve differences in code edits on the same line between two merging commits automatically", "A file is deleted", "The developer has no access"], a: 1}
        ]
    });

    // 3. Docker Containerization
    quizzes.push({
        title: "Docker Containerization",
        questions: [
            {q: "What is a Docker container?", o: ["A virtual machine with full OS", "A lightweight, standalone, executable package containing application and dependencies running as isolated process", "A database server", "A cloud server instance"], a: 1},
            {q: "How does Docker differ from standard Virtual Machines?", o: ["Docker containers share the host OS kernel; VMs run guest OS on hypervisors", "Docker is slower", "VMs are smaller", "Docker requires more RAM"], a: 0},
            {q: "What is a Docker Image?", o: ["A runtime instance of a container", "A read-only template containing instructions to build a Docker container", "A picture of the server", "A compression format"], a: 1},
            {q: "What is a Dockerfile?", o: ["A configuration file for ports", "A text document containing all commands a user could call on the command line to assemble a Docker image", "A list of container runs", "A database script"], a: 1},
            {q: "Which Dockerfile instruction specifies the base image?", o: ["RUN", "FROM", "CMD", "COPY"], a: 1},
            {q: "Which Dockerfile instruction executes commands inside the image during the build phase?", o: ["CMD", "RUN", "ENTRYPOINT", "EXPOSE"], a: 1},
            {q: "Which Dockerfile instruction specifies the default command to execute when the container starts?", o: ["RUN", "CMD", "ENV", "ADD"], a: 1},
            {q: "Which command lists running Docker containers?", o: ["docker list", "docker ps", "docker containers", "docker show"], a: 1},
            {q: "What does the 'EXPOSE' instruction do in a Dockerfile?", o: ["Publishes ports to the host machine automatically", "Documents the ports on which the container will listen at runtime", "Closes ports", "Redirects network requests"], a: 1},
            {q: "What is a Docker Volume used for?", o: ["Increasing container memory", "Persisting data generated and used by Docker containers on the host machine", "Compressing images", "Enforcing SSL"], a: 1}
        ]
    });

    // 4. Advanced Docker
    quizzes.push({
        title: "Docker Compose & Optimization",
        questions: [
            {q: "What is Docker Compose?", o: ["A tool to compile Java code", "A tool for defining and running multi-container Docker applications using a YAML configuration file", "A code minification tool", "A cloud deployment engine"], a: 1},
            {q: "What is a multi-stage Docker build?", o: ["Building on multiple servers", "Using multiple FROM statements in a Dockerfile to separate build-time dependencies from the runtime image, reducing size", "Deploying to multiple clouds", "Using multiple docker-compose files"], a: 1},
            {q: "How do you start all services defined in a docker-compose.yml file?", o: ["docker start", "docker-compose up", "docker-compose run", "docker up"], a: 1},
            {q: "What is the command to stop and remove all resources created by docker-compose up?", o: ["docker-compose stop", "docker-compose down", "docker-compose remove", "docker down"], a: 1},
            {q: "How can you specify environment variables inside a docker-compose.yml file?", o: ["Using the 'environment' or 'env_file' keys", "Using the FROM instruction", "Hardcoding in the host OS", "Via command arguments only"], a: 0},
            {q: "What does the 'depends_on' key define in a Docker Compose service?", o: ["The database credentials", "The startup order dependency of containers", "The memory size limits", "The network bridge configuration"], a: 1},
            {q: "How does Docker caching work during image builds?", o: ["It caches database rows", "It reuses unchanged layers/instructions from previous builds to speed up compile time", "It downloads from cloud", "It runs in background threads"], a: 1},
            {q: "What happens if you run a container without specifying a volume for its database files?", o: ["The container crashes immediately", "The data is lost permanently when the container is deleted/removed", "Data is uploaded to cloud", "The host machine runs out of memory"], a: 1},
            {q: "Which command builds a Docker image from a local Dockerfile?", o: ["docker create", "docker build", "docker commit", "docker compile"], a: 1},
            {q: "What is Docker Hub?", o: ["A hardware router", "A cloud-based registry service that allows linking code repositories, building and testing images, and hosting registries", "A database system", "A programming IDE"], a: 1}
        ]
    });

    // 5. Kubernetes Core
    quizzes.push({
        title: "Kubernetes Architecture & Pods",
        questions: [
            {q: "What is Kubernetes?", o: ["A code compiler", "An open-source container orchestration engine for automating deployment, scaling, and management of containerized apps", "A database engine", "A virtual machine host"], a: 1},
            {q: "What is the smallest deployable unit of execution in Kubernetes?", o: ["Container", "Pod", "Node", "Service"], a: 1},
            {q: "What does a Pod contain?", o: ["A single physical server", "One or more containers (sharing storage and network resources)", "An entire Kubernetes cluster", "A database schema"], a: 1},
            {q: "What component runs on nodes to manage container execution based on specifications?", o: ["kube-apiserver", "kubelet", "etcd", "kube-scheduler"], a: 1},
            {q: "Which key-value store is used as Kubernetes' backing store for all cluster data?", o: ["Redis", "etcd", "MongoDB", "MySQL"], a: 1},
            {q: "Which component in the control plane assigns pods to nodes based on resource availability?", o: ["kube-controller-manager", "kube-scheduler", "kubelet", "kube-proxy"], a: 1},
            {q: "What is a Kubernetes Deployment?", o: ["A physical build", "A resource object that defines the declarative state for Pods and ReplicaSets, managing updates", "A database query", "A network routing rule"], a: 1},
            {q: "Which tool is the standard command-line interface for communicating with a Kubernetes cluster?", o: ["docker", "kubectl", "k8s-cli", "kubeadm"], a: 1},
            {q: "What command lists all active pods in a namespace?", o: ["kubectl list pods", "kubectl get pods", "kubectl show pods", "kubectl get namespaces"], a: 1},
            {q: "What is a Node in Kubernetes?", o: ["A code block", "A worker machine (physical or virtual) that runs pod workloads", "An API endpoint", "A cluster configuration"], a: 1}
        ]
    });

    // 6. Kubernetes Advanced
    quizzes.push({
        title: "Kubernetes Networking & Configs",
        questions: [
            {q: "What is a Kubernetes Service?", o: ["A system daemon", "An abstraction that defines a logical set of Pods and a policy to access them (providing a stable IP)", "A cloud database", "A cluster deployment process"], a: 1},
            {q: "Which Service type exposes the Service on a static port on each Node's IP?", o: ["ClusterIP", "NodePort", "LoadBalancer", "ExternalName"], a: 1},
            {q: "Which Service type is the default, exposing it only inside the cluster?", o: ["NodePort", "ClusterIP", "LoadBalancer", "Ingress"], a: 1},
            {q: "Which Service type exposes the service externally using a cloud provider's load balancer?", o: ["ClusterIP", "NodePort", "LoadBalancer", "ExternalName"], a: 2},
            {q: "What is a Kubernetes Ingress?", o: ["An internal API", "An API object that manages external access to the services in a cluster, typically HTTP", "A container storage volume", "A node controller"], a: 1},
            {q: "What is a ConfigMap used for?", o: ["Storing Docker images", "Storing non-confidential configuration data in key-value pairs", "Encrypting database passwords", "Mapping network routes"], a: 1},
            {q: "What is a Secret used for?", o: ["A hidden service", "Storing sensitive configuration data like passwords, keys, and tokens securely", "Configuring cluster IPs", "Private namespaces"], a: 1},
            {q: "What is a namespace in Kubernetes?", o: ["A domain name", "A virtual partition/cluster within a physical Kubernetes cluster to isolate resources", "A path directory", "A node label"], a: 1},
            {q: "Which controller ensures that a specific number of pod replicas are running at any given time?", o: ["Deployment", "ReplicaSet", "StatefulSet", "DaemonSet"], a: 1},
            {q: "Which controller runs a copy of a Pod on all (or some) Nodes in the cluster?", o: ["ReplicaSet", "DaemonSet", "StatefulSet", "Job"], a: 1}
        ]
    });

    // 7. Terraform IaC
    quizzes.push({
        title: "Infrastructure as Code & Terraform",
        questions: [
            {q: "What is Infrastructure as Code (IaC)?", o: ["Writing code inside server terminals", "Managing and provisioning infrastructure through machine-readable definition files rather than manual configuration", "Compiling hardware architectures", "A form of database optimization"], a: 1},
            {q: "Which tool is a widely used open-source IaC tool created by HashiCorp?", o: ["Docker", "Terraform", "Ansible", "Kubernetes"], a: 1},
            {q: "What language is used to write Terraform configurations?", o: ["JSON", "HCL (HashiCorp Configuration Language)", "YAML", "Python"], a: 1},
            {q: "What is the purpose of the 'terraform init' command?", o: ["Compiles the configuration code", "Initializes a working directory containing Terraform configuration files and downloads providers", "Deploys resources to cloud", "Destroys previous states"], a: 1},
            {q: "What does 'terraform plan' do?", o: ["Deploys configuration changes immediately", "Generates an execution plan showing what actions Terraform will take to reach the desired state", "Creates a backup file", "Initializes the provider downloads"], a: 1},
            {q: "Which command executes the actions proposed in a Terraform plan?", o: ["terraform run", "terraform apply", "terraform deploy", "terraform commit"], a: 1},
            {q: "Which command deletes all infrastructure managed by the Terraform configuration?", o: ["terraform delete", "terraform destroy", "terraform remove", "terraform down"], a: 1},
            {q: "What is the Terraform State file (.tfstate) used for?", o: ["Configuring provider API keys", "Tracking the metadata and status of real-world resources mapped to your configuration", "Writing script functions", "Defining cloud resources list"], a: 1},
            {q: "What are Providers in Terraform?", o: ["Cloud service vendors", "Plugins that allow Terraform to interact with cloud providers, SaaS providers, and other APIs", "Database connections", "Hardware engineers"], a: 1},
            {q: "What is a resource block in Terraform?", o: ["A script function", "A declaration of a specific infrastructure object (e.g. EC2 instance) to be managed", "An error block", "A provider link"], a: 1}
        ]
    });

    // 8. AWS Infrastructure
    quizzes.push({
        title: "AWS Cloud Foundations",
        questions: [
            {q: "What does AWS stand for?", o: ["Amazon Web Services", "Alpha Web Systems", "Advanced Web Solutions", "Asymmetric Web Storage"], a: 0},
            {q: "Which AWS service provides resizable virtual compute servers?", o: ["S3", "EC2 (Elastic Compute Cloud)", "Lambda", "RDS"], a: 1},
            {q: "What is an AMI (Amazon Machine Image) in AWS?", o: ["A database index", "A pre-configured template containing OS and software to launch an EC2 instance", "A security credential", "A virtual private cloud type"], a: 1},
            {q: "What does S3 stand for?", o: ["Simple Storage Service", "System Storage Solution", "Secure Server System", "Symmetric Storage Service"], a: 0},
            {q: "AWS S3 is best described as which type of storage?", o: ["Block storage", "Object storage", "File system storage", "Relational database storage"], a: 1},
            {q: "What is a VPC (Virtual Private Cloud) in AWS?", o: ["A physical private server", "A logically isolated virtual network dedicated to your AWS account", "A global database", "A firewall router"], a: 1},
            {q: "What is a security group in AWS?", o: ["A team of security experts", "A virtual firewall that controls inbound and outbound traffic for EC2 instances", "An encryption key pair", "A user access role"], a: 1},
            {q: "What AWS service is a managed relational database service supporting MySQL, PostgreSQL, etc.?", o: ["DynamoDB", "RDS (Relational Database Service)", "Redshift", "ElastiCache"], a: 1},
            {q: "What is an IAM role in AWS?", o: ["A user password", "An identity with permission policies that determine what the identity can and cannot do in AWS", "A port routing rule", "A network subnet"], a: 1},
            {q: "What is the primary benefit of deploying applications across multiple AWS Availability Zones (AZs)?", o: ["Lower prices", "High availability and fault tolerance", "Faster compilation", "Automatic code generation"], a: 1}
        ]
    });

    // 9. Serverless & Cloud Databases
    quizzes.push({
        title: "Serverless Architecture & Cloud DBs",
        questions: [
            {q: "What defines Serverless computing?", o: ["No servers are used to run the code", "Developers write code and cloud providers manage server provisioning, scaling, and maintenance dynamically", "Apps run completely on client devices offline", "A legacy hosting mechanism"], a: 1},
            {q: "Which AWS service is a pioneer of serverless compute, running functions in response to events?", o: ["EC2", "Lambda", "Fargate", "Elastic Beanstalk"], a: 1},
            {q: "What is a key billing characteristic of AWS Lambda?", o: ["Charged per hour of server uptime regardless of usage", "Charged based on the number of requests and the duration (execution time in ms)", "Monthly flat fee", "Free for all AWS users"], a: 1},
            {q: "Which AWS NoSQL database service is fully managed and key-value document-based?", o: ["RDS", "DynamoDB", "Redshift", "Aurora"], a: 1},
            {q: "What does the term 'cold start' refer to in serverless?", o: ["Starting a server in a cold data center", "The latency delay when a serverless function is invoked for the first time or after inactivity while container spins up", "Rebooting a crashed server", "Enforcing secure routes"], a: 1},
            {q: "What is AWS API Gateway used for?", o: ["Routing emails", "Creating, publishing, maintaining, monitoring, and securing REST and WebSocket APIs at scale", "Storing images", "Managing databases"], a: 1},
            {q: "How does DynamoDB scale read and write throughput?", o: ["Requires manual server upgrades", "Automatically scales partition allocations and throughput dynamically (auto-scaling)", "By decreasing block sizes", "By moving data to S3"], a: 1},
            {q: "Which service acts as a serverless orchestrator to coordinate multiple AWS services into serverless workflows?", o: ["AWS Lambda", "AWS Step Functions", "AWS SQS", "AWS SNS"], a: 1},
            {q: "What is an event source in serverless computing?", o: ["An error code", "Any AWS service or custom app that triggers a serverless function (e.g. S3 upload, HTTP request)", "The code repository", "The compiler type"], a: 1},
            {q: "What is the maximum execution time limit (timeout) for a single AWS Lambda function invocation?", o: ["1 minute", "15 minutes", "1 hour", "Unlimited"], a: 1}
        ]
    });

    // 10. DevOps Monitoring
    quizzes.push({
        title: "Monitoring, Metrics & Observability",
        questions: [
            {q: "What are the three pillars of system Observability?", o: ["Users, Admins, Servers", "Metrics, Logs, and Traces", "Alerts, Dashboards, Files", "CPU, RAM, Disk"], a: 1},
            {q: "Which open-source monitoring and alerting toolkit is pull-based and collects time-series metrics?", o: ["Docker", "Prometheus", "Grafana", "Logstash"], a: 1},
            {q: "Which open-source visualization and analytics platform is commonly used alongside Prometheus to build dashboards?", o: ["Jenkins", "Grafana", "Docker", "Kubernetes"], a: 1},
            {q: "What query language is used to retrieve metrics from Prometheus?", o: ["SQL", "PromQL", "GraphQL", "JSONPath"], a: 1},
            {q: "What is the push vs pull metric collection model?", o: ["Push: target sends metrics to server; Pull: server queries targets at intervals to scrape metrics", "Push is faster", "Pull requires more memory", "No differences"], a: 0},
            {q: "What is log aggregation?", o: ["Deleting old files", "Collecting and consolidating log files from multiple servers and services into a single central database", "Formatting strings", "Restarting crashed containers"], a: 1},
            {q: "Which popular open-source log aggregation stack is known as the ELK stack?", o: ["Express, Linux, Kotlin", "Elasticsearch, Logstash, and Kibana", "Ec2, Lambda, Kubernetes", "Event, Loop, Key"], a: 1},
            {q: "What does APM stand for in monitoring?", o: ["Application Performance Monitoring", "Automatic Process Manager", "Asymmetric Protocol Model", "Alert Policy Manager"], a: 0},
            {q: "What is distributed tracing used for?", o: ["Tracking location of users", "Tracking and profiling requests as they flow through a distributed microservices architecture", "Scanning source files", "Locating database backups"], a: 1},
            {q: "What does a SLA (Service Level Agreement) define?", o: ["Code formatting rules", "A commitment between a service provider and a client regarding service availability, performance, and targets", "The database normal forms", "The developer hours"], a: 1}
        ]
    });
    
    return quizzes;
}

function generateAimlQuizzes() {
    const quizzes = [];
    
    // 1. Intro to AI/ML
    quizzes.push({
        title: "AI & ML Core Classifications",
        questions: [
            {q: "What is Machine Learning?", o: ["Writing rule-based systems", "A subset of AI that enables computers to learn from data without being explicitly programmed", "A database search query", "A physical robotics kit"], a: 1},
            {q: "What are the three main paradigms of Machine Learning?", o: ["Active, Passive, Hybrid", "Supervised, Unsupervised, and Reinforcement Learning", "Linear, Polynomial, Exponential", "Python, R, Julia"], a: 1},
            {q: "What defines Supervised Learning?", o: ["Learning from unlabeled data", "Learning from labeled training data (data paired with correct output labels)", "Learning through trials and rewards", "Enforcing strict user privileges"], a: 1},
            {q: "What defines Unsupervised Learning?", o: ["Learning from labeled data", "Learning from unlabeled data to find hidden structures or patterns", "Learning from direct user instructions", "Running database queries"], a: 1},
            {q: "What is Reinforcement Learning?", o: ["Training models with large tables", "Learning through feedback of trials, actions, rewards, and punishments in an environment", "Sorting database rows", "Using pre-trained weights only"], a: 1},
            {q: "Which task is a classic example of supervised classification?", o: ["Predicting house prices", "Spam email detection (labeling as spam or not)", "Grouping customers by purchase history", "Reducing dimensions of an image"], a: 1},
            {q: "Which task is a classic example of supervised regression?", o: ["Spam email detection", "Predicting house prices (continuous value output)", "Finding anomalies in server traffic", "Clustering web articles"], a: 1},
            {q: "What is Deep Learning?", o: ["A legacy database search", "A subset of ML based on artificial neural networks with multiple layers (deep architectures)", "Programming in C++", "Running multiple servers"], a: 1},
            {q: "What does 'training' a model represent?", o: ["Saving python scripts", "Optimizing model parameters (weights) to minimize error/loss on the training dataset", "Deploying models to AWS", "Compressing files"], a: 1},
            {q: "What does a 'features' array represent in ML datasets?", o: ["The output labels", "The input variables/attributes used by the model to make predictions", "The system performance scores", "The model algorithms list"], a: 1}
        ]
    });

    // 2. Data Preprocessing
    quizzes.push({
        title: "Preprocessing & Feature Engineering",
        questions: [
            {q: "Why is data preprocessing crucial in ML?", o: ["To speed up internet speed", "To clean raw data and format it into a structured layout suitable for model training", "To encrypt database inputs", "To write web pages"], a: 1},
            {q: "What is Min-Max Scaling (Normalization)?", o: ["Deleting outliers", "Scaling feature values to fit within a specific range, typically [0, 1]", "Calculating averages", "Sorting columns"], a: 1},
            {q: "What is Standardization (Z-score normalization)?", o: ["Setting all values to 1", "Scaling features so they have a mean of 0 and standard deviation of 1", "Replacing missing values", "One-hot encoding"], a: 1},
            {q: "What is One-Hot Encoding?", o: ["Compressing images", "Converting categorical variables into a binary matrix format", "Sorting list values", "A database join type"], a: 1},
            {q: "What does handling missing values by 'imputation' mean?", o: ["Deleting rows with missing values", "Replacing missing values with statistical estimates like mean, median, or mode", "Ignoring the columns", "Encrypting empty slots"], a: 1},
            {q: "What is an outlier?", o: ["A missing column", "A data point that differs significantly from other observations in the dataset", "A correct output label", "A feature variable"], a: 1},
            {q: "What is feature engineering?", o: ["Writing system code", "Creating new input features or transforming existing ones to improve model performance", "Designing neural network chips", "Deploying models to cloud"], a: 1},
            {q: "What does the term 'garbage in, garbage out' mean in ML?", o: ["Garbage collector cleans memory", "The quality of model predictions depends directly on the quality of input data", "Old files should be deleted", "Unsupervised models are useless"], a: 1},
            {q: "What is the risk of having highly correlated features in linear models?", o: ["Overfitting database rows", "Multicollinearity, which can destabilize coefficient estimates", "Slower compilation times", "Loss of input files"], a: 1},
            {q: "Which preprocessing step scales data while keeping it robust to outliers?", o: ["StandardScaler", "RobustScaler (using median and IQR)", "MinMaxScaler", "Normalizer"], a: 1}
        ]
    });

    // 3. Regression
    quizzes.push({
        title: "Regression Algorithms",
        questions: [
            {q: "What is the main goal of Linear Regression?", o: ["Predicting categorical classes", "Modeling the linear relationship between input features and a continuous target variable", "Grouping data items", "Finding anomalies"], a: 1},
            {q: "What equation represents Simple Linear Regression?", o: ["y = mx + c", "y = ax^2 + bx + c", "y = 1 / (1 + e^-x)", "y = log(x)"], a: 0},
            {q: "What is Mean Squared Error (MSE) used for in regression?", o: ["A classification metric", "A loss function measuring the average squared difference between predicted and actual values", "Measuring database storage size", "Sorting values"], a: 1},
            {q: "What optimization algorithm iteratively updates weights to minimize the loss function?", o: ["Decision Tree", "Gradient Descent", "K-Means", "PCA"], a: 1},
            {q: "What parameter controls the step size taken during each iteration of Gradient Descent?", o: ["Learning Rate (alpha)", "Regularization factor", "Number of trees", "Batch size"], a: 0},
            {q: "What is the risk of having a learning rate that is too high?", o: ["The algorithm runs too slow", "The optimization may overshoot the minimum and fail to converge", "The model overfits", "The features are deleted"], a: 1},
            {q: "What is the risk of having a learning rate that is too low?", o: ["The model diverges", "The algorithm takes a very long time to converge", "The model underfits", "The loss becomes negative"], a: 1},
            {q: "Which regression technique adds L1 regularization to penalize absolute weights, potentially driving coefficients to zero (feature selection)?", o: ["Ridge Regression", "Lasso Regression", "Linear Regression", "Polynomial Regression"], a: 1},
            {q: "Which regression technique adds L2 regularization to penalize squared weights?", o: ["Lasso", "Ridge", "ElasticNet", "Linear"], a: 1},
            {q: "What metric represents the proportion of variance in the dependent variable explained by the regression model?", o: ["MSE", "R-squared (R2)", "MAE", "RMSE"], a: 1}
        ]
    });

    // 4. Classification
    quizzes.push({
        title: "Classification Algorithms",
        questions: [
            {q: "Which classification algorithm outputs probability estimates mapped using a sigmoid function?", o: ["Linear Regression", "Logistic Regression", "K-Means", "PCA"], a: 1},
            {q: "What is the output range of the Sigmoid function?", o: ["[-1, 1]", "[0, 1]", "[-infinity, infinity]", "[0, infinity]"], a: 1},
            {q: "Which classification algorithm splits data based on feature conditions to build a tree structure?", o: ["Logistic Regression", "Decision Tree", "K-Nearest Neighbors", "Naive Bayes"], a: 1},
            {q: "What metric measures node impurity or disorder in Decision Trees?", o: ["Mean Squared Error", "Entropy / Gini Impurity", "R-squared", "Silhouette score"], a: 1},
            {q: "Which ensemble algorithm builds multiple decision trees on random subsets of data and averages their predictions?", o: ["AdaBoost", "Random Forest", "Gradient Boosting", "XGBoost"], a: 1},
            {q: "What is K-Nearest Neighbors (KNN) classification based on?", o: ["Calculating probabilities using Bayes theorem", "Classifying a data point based on the majority vote of its K closest neighbors in feature space", "Splitting nodes recursively", "Adding weight penalties"], a: 1},
            {q: "Which classification algorithm is based on Bayes' Theorem, assuming feature independence?", o: ["Decision Tree", "Naive Bayes", "Support Vector Machines", "KNN"], a: 1},
            {q: "What is the core objective of Support Vector Machines (SVM)?", o: ["Finding clusters of data", "Finding the optimal hyperplane that maximizes the margin between different classes", "Building a forest of trees", "Predicting housing prices"], a: 1},
            {q: "What are support vectors in SVM?", o: ["The weights vectors", "The data points closest to the decision boundary (hyperplane)", "The classification labels", "The kernel parameters"], a: 1},
            {q: "What does the 'kernel trick' in SVM accomplish?", o: ["Speeds up training time", "Maps low-dimensional input space to higher-dimensional space to make data linearly separable", "Clears outliers", "Filters features"], a: 1}
        ]
    });

    // 5. Clustering
    quizzes.push({
        title: "Unsupervised Clustering",
        questions: [
            {q: "What is the primary goal of clustering in ML?", o: ["Predicting house prices", "Grouping similar data points together based on feature characteristics", "Reducing dimensions of tables", "Fitting regression lines"], a: 1},
            {q: "Which popular clustering algorithm partitions data into K distinct clusters by iteratively updating centroids?", o: ["DBSCAN", "K-Means", "Hierarchical Clustering", "Gaussian Mixture Models"], a: 1},
            {q: "What is the first step of the K-Means clustering algorithm?", o: ["Assigning data points to closest centroids", "Initializing K random centroids in the feature space", "Updating centroid coordinates", "Calculating silhouette score"], a: 1},
            {q: "How does K-Means update cluster centroids in each iteration?", o: ["By taking the median", "By calculating the mean coordinates of all data points assigned to each cluster", "By moving them randomly", "By deleting empty clusters"], a: 1},
            {q: "Which method is commonly used to find the optimal number of clusters (K) in K-Means?", o: ["Elbow Method (plotting inertia/WCSS)", "Cross-validation", "Grid search", "Gradient descent"], a: 0},
            {q: "Which metric evaluates clustering quality by measuring how close a point is to its own cluster compared to other clusters?", o: ["Mean Squared Error", "Silhouette Coefficient / Score", "R-squared", "F1 Score"], a: 1},
            {q: "Which clustering algorithm identifies clusters based on data density, handling arbitrary shapes and outliers?", o: ["K-Means", "DBSCAN", "Hierarchical Clustering", "Agglomerative Clustering"], a: 1},
            {q: "In DBSCAN, what represents the minimum distance threshold for points to be considered neighbors?", o: ["min_samples", "eps (epsilon)", "K", "bandwidth"], a: 1},
            {q: "In DBSCAN, what represents the minimum number of points required to form a dense region?", o: ["eps", "min_samples", "K", "cluster_count"], a: 1},
            {q: "What type of clustering builds a tree-like hierarchy of clusters represented as a dendrogram?", o: ["K-Means", "Hierarchical Clustering", "DBSCAN", "Spectral Clustering"], a: 1}
        ]
    });

    // 6. Dimensionality Reduction
    quizzes.push({
        title: "Dimensionality Reduction & PCA",
        questions: [
            {q: "What is dimensionality reduction?", o: ["Reducing image resolutions", "Reducing the number of input features in a dataset while retaining essential information", "Deleting rows with missing values", "Reducing server storage"], a: 1},
            {q: "What is a major consequence of the 'curse of dimensionality'?", o: ["Models train faster", "Data becomes sparse in high-dimensional space, requiring exponentially more data for generalization", "Outliers are deleted automatically", "Features become linearly separable"], a: 1},
            {q: "Which linear dimensionality reduction technique projects data onto orthogonal axes that maximize variance?", o: ["t-SNE", "Principal Component Analysis (PCA)", "DBSCAN", "Linear Regression"], a: 1},
            {q: "What are Principal Components in PCA?", o: ["The input variables", "The new orthogonal axes that represent directions of maximum variance in the data", "The model coefficients", "The cluster centroids"], a: 1},
            {q: "Before running PCA, what preprocessing step is mandatory?", o: ["One-hot encoding", "Standardization / Feature Scaling (mean centering)", "Imputation of labels", "Outlier deletion only"], a: 1},
            {q: "What represents the proportion of total dataset variance captured by each principal component?", o: ["Silhouette score", "Explained Variance Ratio", "R-squared", "Eigenvalue list"], a: 1},
            {q: "Which dimensionality reduction technique is non-linear and primarily used for 2D/3D visualization of high-dimensional data?", o: ["PCA", "t-SNE (t-Distributed Stochastic Neighbor Embedding)", "Linear Discriminant Analysis", "SVD"], a: 1},
            {q: "What does LDA (Linear Discriminant Analysis) maximize compared to PCA?", o: ["Overall variance", "Class separability (supervised dimensionality reduction)", "Local neighborhoods", "Correlation of features"], a: 1},
            {q: "How does PCA handle features with very different scales if not standardized?", o: ["It normalizes them automatically", "Features with larger scales will dominate the principal components", "It throws a runtime error", "It ignores the small scale features"], a: 1},
            {q: "What mathematical decomposition is used under the hood in PCA?", o: ["LU Decomposition", "Singular Value Decomposition (SVD) or Eigendecomposition", "QR Decomposition", "Cholesky Decomposition"], a: 1}
        ]
    });

    // 7. Deep Learning Core
    quizzes.push({
        title: "Neural Networks Core Mechanics",
        questions: [
            {q: "What is the basic unit of an Artificial Neural Network?", o: ["Neuron / Perceptron", "Weight", "Activation function", "Layer"], a: 0},
            {q: "What is the purpose of an activation function in neural networks?", o: ["To save weights", "To introduce non-linearity into the network, enabling it to learn complex patterns", "To calculate loss", "To pass inputs to the stack"], a: 1},
            {q: "Which activation function outputs values in the range [0, 1]?", o: ["tanh", "Sigmoid", "ReLU", "Softmax"], a: 1},
            {q: "Which activation function outputs values in the range [-1, 1]?", o: ["Sigmoid", "tanh", "ReLU", "Leaky ReLU"], a: 1},
            {q: "Which activation function outputs the input directly if positive, and zero otherwise?", o: ["Sigmoid", "ReLU (Rectified Linear Unit)", "tanh", "Softmax"], a: 1},
            {q: "What is the purpose of Backpropagation in neural network training?", o: ["To calculate inputs", "To calculate the gradient of the loss function with respect to the weights using the chain rule", "To run forward pass", "To save models to disk"], a: 1},
            {q: "What is the vanishing gradient problem?", o: ["Gradients become too large during training", "Gradients shrink exponentially during backpropagation in deep networks, preventing weights from updating", "Loss becomes zero", "Model parameters are deleted"], a: 1},
            {q: "Which activation function helps mitigate the vanishing gradient problem in deep networks?", o: ["Sigmoid", "ReLU", "tanh", "Linear"], a: 1},
            {q: "What does a dense (fully connected) layer mean?", o: ["A layer with many rows", "A layer where each neuron is connected to all neurons in the previous layer", "A layer with high weights", "A convolutional layer"], a: 1},
            {q: "Which activation function is standard at the output layer of a multi-class classification neural network?", o: ["Sigmoid", "Softmax", "ReLU", "Identity"], a: 1}
        ]
    });

    // 8. Convolutional Networks
    quizzes.push({
        title: "Convolutional Neural Networks (CNNs)",
        questions: [
            {q: "Which neural network architecture is standard for image processing and computer vision?", o: ["RNN", "CNN (Convolutional Neural Network)", "Transformer", "Perceptron"], a: 1},
            {q: "What is the role of a kernel (filter) in a convolutional layer?", o: ["To reduce array size", "To slide across input data to extract local feature maps (e.g. edges, shapes)", "To compute gradients", "To store output labels"], a: 1},
            {q: "What does the 'stride' parameter in CNNs define?", o: ["The size of the filter", "The step size by which the filter slides across the input image", "The padding width", "The number of output channels"], a: 1},
            {q: "What is the purpose of 'padding' in convolutional layers?", o: ["To add weight decay", "To preserve the spatial dimensions of the input or allow filters to capture border pixels", "To compile images", "To normalize values"], a: 1},
            {q: "What is the role of a pooling layer (e.g. Max Pooling) in CNNs?", o: ["To increase parameter count", "To downsample feature maps, reducing spatial dimensions and parameter count while retaining key features", "To apply activation functions", "To connect all layers"], a: 1},
            {q: "Which layer is typically placed before dense layers in a CNN to convert 2D feature maps to a 1D vector?", o: ["Convolutional layer", "Flatten layer", "Pooling layer", "Activation layer"], a: 1},
            {q: "What does local receptive field refer to in CNNs?", o: ["The overall image size", "The local region of the input image that a neuron in a convolutional layer is connected to", "The memory size of GPU", "The network layer count"], a: 1},
            {q: "Which of the following is a classic CNN architecture?", o: ["LSTM", "AlexNet / ResNet / VGG", "Transformer", "BERT"], a: 1},
            {q: "What is transfer learning in deep learning?", o: ["Moving code between servers", "Using a model pre-trained on a large dataset (e.g. ImageNet) as starting point for a different task", "Passing inputs recursively", "Training on multiple GPUs"], a: 1},
            {q: "Which CNN layer introduces shift and translation invariance to some degree?", o: ["Convolutional", "Pooling (Max Pooling)", "Dense", "Input"], a: 1}
        ]
    });

    // 9. Sequence Models
    quizzes.push({
        title: "Sequence Models & Transformers",
        questions: [
            {q: "Which neural network architecture is designed to handle sequential/time-series data by maintaining state?", o: ["CNN", "RNN (Recurrent Neural Network)", "Dense Network", "Autoencoder"], a: 1},
            {q: "What RNN variant was introduced to resolve the vanishing gradient problem over long sequences?", o: ["Perceptron", "LSTM (Long Short-Term Memory) / GRU", "CNN", "ResNet"], a: 1},
            {q: "What are the three core gates in an LSTM cell?", o: ["Input, Output, Forget Gates", "Read, Write, Execute Gates", "AND, OR, NOT Gates", "Start, Run, Stop Gates"], a: 0},
            {q: "What is the primary mechanism that powers Transformer models, replacing recurrent connections?", o: ["Convolutions", "Self-Attention Mechanism", "Pooling", "Backpropagation only"], a: 1},
            {q: "Which model architecture is the foundation for large language models (LLMs) like GPT?", o: ["LSTM", "Transformer", "CNN", "Autoencoder"], a: 1},
            {q: "What does self-attention in Transformers allow a model to do?", o: ["Calculate errors faster", "Relate different positions of a single sequence to compute its representation (contextual understanding)", "Train without labels", "Optimize weights directly"], a: 1},
            {q: "What is the purpose of Positional Encoding in Transformers?", o: ["To classify text tags", "To inject information about the order/position of words in the sequence since there is no recurrence", "To compress weights", "To calculate loss"], a: 1},
            {q: "Which model is a bidirectional Transformer encoder model pre-trained by Google for NLP tasks?", o: ["GPT", "BERT", "ResNet", "AlexNet"], a: 1},
            {q: "What is the role of the Forget Gate in an LSTM?", o: ["To reset the model", "To decide what information to discard or keep from the cell state", "To calculate gradients", "To format output text"], a: 1},
            {q: "Are Transformers computationally parallelizable compared to standard RNNs?", o: ["No, they are sequential", "Yes, because the self-attention mechanism processes all tokens in a sequence simultaneously", "Only on TPUs", "Only for small text sizes"], a: 1}
        ]
    });

    // 10. Model Evaluation & Tuning
    quizzes.push({
        title: "Model Evaluation & Generalization",
        questions: [
            {q: "What is overfitting?", o: ["Model trains too slow", "Model learns training data noise and performs poorly on unseen validation data", "Model cannot learn training data", "Model runs out of memory"], a: 1},
            {q: "What is underfitting?", o: ["Model is too small", "Model is too simple to capture the underlying structure of the data, performing poorly on both training and test data", "Model has zero weights", "Model diverges"], a: 1},
            {q: "What split of data is used to evaluate the final generalized performance of a model?", o: ["Training Set", "Validation Set", "Test Set", "Feature Set"], a: 2},
            {q: "What evaluation technique splits data into K subsets and trains/tests the model K times?", o: ["Holdout method", "K-Fold Cross-Validation", "Bootstrapping", "Grid Search"], a: 1},
            {q: "Which metric represents the ratio of correct predictions to total predictions?", o: ["Precision", "Recall", "Accuracy", "F1 Score"], a: 2},
            {q: "Which metric represents the proportion of actual positive cases that were correctly identified?", o: ["Precision", "Recall (Sensitivity)", "Specificity", "Accuracy"], a: 1},
            {q: "Which metric represents the proportion of predicted positive cases that are actually positive?", o: ["Recall", "Precision", "F1 Score", "Specificity"], a: 1},
            {q: "What is the harmonic mean of Precision and Recall?", o: ["Accuracy", "F1 Score", "ROC-AUC", "MAE"], a: 1},
            {q: "What regularization technique randomly deactivates a fraction of neurons during training to prevent co-adaptation?", o: ["Batch Normalization", "Dropout", "Weight Decay", "L1 Regularization"], a: 1},
            {q: "What does hyperparameter tuning accomplish?", o: ["Trains model weights", "Searches for the optimal model configuration settings (e.g. learning rate, layers) that are set before training", "Saves code files", "Normalizes feature tables"], a: 1}
        ]
    });
    
    return quizzes;
}

function main() {
    const allQuizzes = [];
    
    const coursesConfig = {
        "c_dsa": generateDsaQuizzes,
        "c_webdev": generateWebdevQuizzes,
        "c_dbms": generateDbmsQuizzes,
        "c_netsec": generateNetsecQuizzes,
        "c_javascript": generateJsQuizzes,
        "c_mobile": generateMobileQuizzes,
        "c_devops": generateDevopsQuizzes,
        "c_aiml": generateAimlQuizzes
    };
    
    const nowIso = new Date().toISOString();
    
    for (const [courseId, generatorFn] of Object.entries(coursesConfig)) {
        const quizzes = generatorFn();
        quizzes.forEach((quiz, idx) => {
            const quizNum = idx + 1;
            const quizId = `q_${courseId}_${quizNum}`;
            
            const formattedQuestions = quiz.questions.map((q, qIdx) => {
                const qNum = qIdx + 1;
                const qId = `qd_${courseId}_${quizNum}_${qNum}`;
                return {
                    questionText: q.q,
                    options: q.o,
                    correctOptionIndex: q.a,
                    _id: qId
                };
            });
            
            allQuizzes.push({
                _id: quizId,
                createdAt: nowIso,
                updatedAt: nowIso,
                course: courseId,
                title: quiz.title,
                questions: formattedQuestions
            });
        });
    }
    
    const outputPath = path.join(__dirname, 'backend/data/quizs.json');
    fs.writeFileSync(outputPath, JSON.stringify(allQuizzes, null, 2), 'utf-8');
    
    console.log(`Generated ${allQuizzes.length} quizzes total, containing ${allQuizzes.length * 10} questions!`);
}

main();
