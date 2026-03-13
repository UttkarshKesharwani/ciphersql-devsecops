export const assignments = [
    {
        "title": "Employees in Engineering",
        "description": "Easy",
        "question": "List employees working in Engineering department",
        "sampleTables": [
            {
                "tableName": "employees",
                "columns": [
                    {
                        "columnName": "id",
                        "dataType": "INTEGER"
                    },
                    {
                        "columnName": "name",
                        "dataType": "TEXT"
                    },
                    {
                        "columnName": "department",
                        "dataType": "TEXT"
                    }
                ],
                "rows": [
                    {
                        "id": 1,
                        "name": "Ravi",
                        "department": "Engineering"
                    },
                    {
                        "id": 2,
                        "name": "Meena",
                        "department": "HR"
                    },
                    {
                        "id": 3,
                        "name": "Karan",
                        "department": "Engineering"
                    }
                ]
            }
        ],
        "expectedOutput": {
            "type": "table",
            "value": [
                {
                    "id": 1,
                    "name": "Ravi",
                    "department": "Engineering"
                },
                {
                    "id": 3,
                    "name": "Karan",
                    "department": "Engineering"
                }
            ]
        },
        "acceptance_rate": 53,
        "referenceQuery": "SELECT * FROM employees WHERE department = 'Engineering';"
    },
    {
        "title": "Count Employees",
        "description": "Easy",
        "question": "Count total employees",
        "sampleTables": [
            {
                "tableName": "employees",
                "columns": [
                    {
                        "columnName": "id",
                        "dataType": "INTEGER"
                    },
                    {
                        "columnName": "name",
                        "dataType": "TEXT"
                    }
                ],
                "rows": [
                    {
                        "id": 1,
                        "name": "A"
                    },
                    {
                        "id": 2,
                        "name": "B"
                    },
                    {
                        "id": 3,
                        "name": "C"
                    }
                ]
            }
        ],
        "expectedOutput": {
            "type": "count",
            "value": 3
        },
        "acceptance_rate": 43,
        "referenceQuery": "SELECT COUNT(*) FROM employees;"
    },
    {
        "title": "Average Salary",
        "description": "Medium",
        "question": "Find average salary",
        "sampleTables": [
            {
                "tableName": "employees",
                "columns": [
                    {
                        "columnName": "salary",
                        "dataType": "INTEGER"
                    }
                ],
                "rows": [
                    {
                        "salary": 40000
                    },
                    {
                        "salary": 60000
                    },
                    {
                        "salary": 80000
                    }
                ]
            }
        ],
        "expectedOutput": {
            "type": "single_value",
            "value": 60000
        },
        "acceptance_rate": 81,
        "referenceQuery": "SELECT AVG(salary) FROM employees;"
    },
    {
        "title": "Orders Above 1000",
        "description": "Easy",
        "question": "List orders with amount > 1000",
        "sampleTables": [
            {
                "tableName": "orders",
                "columns": [
                    {
                        "columnName": "id",
                        "dataType": "INTEGER"
                    },
                    {
                        "columnName": "amount",
                        "dataType": "REAL"
                    }
                ],
                "rows": [
                    {
                        "id": 1,
                        "amount": 500
                    },
                    {
                        "id": 2,
                        "amount": 1200
                    },
                    {
                        "id": 3,
                        "amount": 2000
                    }
                ]
            }
        ],
        "expectedOutput": {
            "type": "column",
            "value": [
                1200,
                2000
            ]
        },
        "acceptance_rate": 46,
        "referenceQuery": "SELECT amount FROM orders WHERE amount > 1000;"
    },
    {
        "title": "Customer Order Count",
        "description": "Medium",
        "question": "Find number of orders per customer",
        "sampleTables": [
            {
                "tableName": "orders",
                "columns": [
                    {
                        "columnName": "customer_id",
                        "dataType": "INTEGER"
                    }
                ],
                "rows": [
                    {
                        "customer_id": 1
                    },
                    {
                        "customer_id": 1
                    },
                    {
                        "customer_id": 2
                    }
                ]
            }
        ],
        "expectedOutput": {
            "type": "table",
            "value": [
                {
                    "customer_id": 1,
                    "count": 2
                },
                {
                    "customer_id": 2,
                    "count": 1
                }
            ]
        },
        "acceptance_rate": 69,
        "referenceQuery": "SELECT customer_id, COUNT(*) as count FROM orders GROUP BY customer_id;"
    },
    {
        "title": "Max Salary",
        "description": "Easy",
        "question": "Find maximum salary",
        "sampleTables": [
            {
                "tableName": "employees",
                "columns": [
                    {
                        "columnName": "salary",
                        "dataType": "INTEGER"
                    }
                ],
                "rows": [
                    {
                        "salary": 50000
                    },
                    {
                        "salary": 90000
                    },
                    {
                        "salary": 75000
                    }
                ]
            }
        ],
        "expectedOutput": {
            "type": "single_value",
            "value": 90000
        },
        "acceptance_rate": 67,
        "referenceQuery": "SELECT MAX(salary) FROM employees;"
    },
    {
        "title": "Join Customers and Orders",
        "description": "Hard",
        "question": "Show customer name with order amount",
        "sampleTables": [
            {
                "tableName": "customers",
                "columns": [
                    {
                        "columnName": "id",
                        "dataType": "INTEGER"
                    },
                    {
                        "columnName": "name",
                        "dataType": "TEXT"
                    }
                ],
                "rows": [
                    {
                        "id": 1,
                        "name": "Amit"
                    },
                    {
                        "id": 2,
                        "name": "Priya"
                    }
                ]
            },
            {
                "tableName": "orders",
                "columns": [
                    {
                        "columnName": "customer_id",
                        "dataType": "INTEGER"
                    },
                    {
                        "columnName": "amount",
                        "dataType": "REAL"
                    }
                ],
                "rows": [
                    {
                        "customer_id": 1,
                        "amount": 1000
                    },
                    {
                        "customer_id": 2,
                        "amount": 2000
                    }
                ]
            }
        ],
        "expectedOutput": {
            "type": "table",
            "value": [
                {
                    "name": "Amit",
                    "amount": 1000
                },
                {
                    "name": "Priya",
                    "amount": 2000
                }
            ]
        },
        "acceptance_rate": 65,
        "referenceQuery": "SELECT customers.name, orders.amount FROM customers JOIN orders ON customers.id = orders.customer_id;"
    },
    {
        "title": "Distinct Departments",
        "description": "Easy",
        "question": "List unique departments",
        "sampleTables": [
            {
                "tableName": "employees",
                "columns": [
                    {
                        "columnName": "department",
                        "dataType": "TEXT"
                    }
                ],
                "rows": [
                    {
                        "department": "HR"
                    },
                    {
                        "department": "HR"
                    },
                    {
                        "department": "Sales"
                    }
                ]
            }
        ],
        "expectedOutput": {
            "type": "column",
            "value": [
                "HR",
                "Sales"
            ]
        },
        "acceptance_rate": 46,
        "referenceQuery": "SELECT DISTINCT department FROM employees;"
    },
    {
        "title": "Total Revenue",
        "description": "Medium",
        "question": "Find total revenue",
        "sampleTables": [
            {
                "tableName": "orders",
                "columns": [
                    {
                        "columnName": "amount",
                        "dataType": "REAL"
                    }
                ],
                "rows": [
                    {
                        "amount": 100
                    },
                    {
                        "amount": 200
                    },
                    {
                        "amount": 300
                    }
                ]
            }
        ],
        "expectedOutput": {
            "type": "single_value",
            "value": 600
        },
        "acceptance_rate": 47,
        "referenceQuery": "SELECT SUM(amount) FROM orders;"
    },
    {
        "title": "Employees Sorted by Salary",
        "description": "Medium",
        "question": "List employees sorted by salary desc",
        "sampleTables": [
            {
                "tableName": "employees",
                "columns": [
                    {
                        "columnName": "name",
                        "dataType": "TEXT"
                    },
                    {
                        "columnName": "salary",
                        "dataType": "INTEGER"
                    }
                ],
                "rows": [
                    {
                        "name": "A",
                        "salary": 40000
                    },
                    {
                        "name": "B",
                        "salary": 70000
                    },
                    {
                        "name": "C",
                        "salary": 60000
                    }
                ]
            }
        ],
        "expectedOutput": {
            "type": "table",
            "value": [
                {
                    "name": "B",
                    "salary": 70000
                },
                {
                    "name": "C",
                    "salary": 60000
                },
                {
                    "name": "A",
                    "salary": 40000
                }
            ]
        },
        "acceptance_rate": 75,
        "referenceQuery": "SELECT name, salary FROM employees ORDER BY salary DESC;"
    },
    {
        "title": "Employees With Bonus",
        "description": "Easy",
        "question": "List employees who received bonus",
        "sampleTables": [
            {
                "tableName": "employees",
                "columns": [
                    {
                        "columnName": "id",
                        "dataType": "INTEGER"
                    },
                    {
                        "columnName": "name",
                        "dataType": "TEXT"
                    },
                    {
                        "columnName": "bonus",
                        "dataType": "INTEGER"
                    }
                ],
                "rows": [
                    {
                        "id": 1,
                        "name": "A",
                        "bonus": 0
                    },
                    {
                        "id": 2,
                        "name": "B",
                        "bonus": 5000
                    },
                    {
                        "id": 3,
                        "name": "C",
                        "bonus": 3000
                    }
                ]
            }
        ],
        "expectedOutput": {
            "type": "table",
            "value": [
                {
                    "id": 2,
                    "name": "B",
                    "bonus": 5000
                },
                {
                    "id": 3,
                    "name": "C",
                    "bonus": 3000
                }
            ]
        },
        "acceptance_rate": 56,
        "referenceQuery": "SELECT id, name, bonus FROM employees WHERE bonus > 0;"
    },
    {
        "title": "Products Above Price",
        "description": "Easy",
        "question": "List products with price greater than 100",
        "sampleTables": [
            {
                "tableName": "products",
                "columns": [
                    {
                        "columnName": "name",
                        "dataType": "TEXT"
                    },
                    {
                        "columnName": "price",
                        "dataType": "REAL"
                    }
                ],
                "rows": [
                    {
                        "name": "Pen",
                        "price": 20
                    },
                    {
                        "name": "Bag",
                        "price": 200
                    },
                    {
                        "name": "Shoes",
                        "price": 500
                    }
                ]
            }
        ],
        "expectedOutput": {
            "type": "column",
            "value": [
                200,
                500
            ]
        },
        "acceptance_rate": 60,
        "referenceQuery": "SELECT price FROM products WHERE price > 100;"
    },
    {
        "title": "Latest Order",
        "description": "Medium",
        "question": "Find latest order date",
        "sampleTables": [
            {
                "tableName": "orders",
                "columns": [
                    {
                        "columnName": "order_date",
                        "dataType": "TEXT"
                    }
                ],
                "rows": [
                    {
                        "order_date": "2024-01-01"
                    },
                    {
                        "order_date": "2024-03-01"
                    },
                    {
                        "order_date": "2024-02-01"
                    }
                ]
            }
        ],
        "expectedOutput": {
            "type": "single_value",
            "value": "2024-03-01"
        },
        "acceptance_rate": 90,
        "referenceQuery": "SELECT MAX(order_date) FROM orders;"
    },
    {
        "title": "Students Above Average Marks",
        "description": "Medium",
        "question": "List students scoring above average",
        "sampleTables": [
            {
                "tableName": "students",
                "columns": [
                    {
                        "columnName": "name",
                        "dataType": "TEXT"
                    },
                    {
                        "columnName": "marks",
                        "dataType": "INTEGER"
                    }
                ],
                "rows": [
                    {
                        "name": "A",
                        "marks": 50
                    },
                    {
                        "name": "B",
                        "marks": 80
                    },
                    {
                        "name": "C",
                        "marks": 90
                    }
                ]
            }
        ],
        "expectedOutput": {
            "type": "column",
            "value": [
                "B",
                "C"
            ]
        },
        "acceptance_rate": 87,
        "referenceQuery": "SELECT name FROM students WHERE marks > (SELECT AVG(marks) FROM students);"
    },
    {
        "title": "Department Max Salary",
        "description": "Hard",
        "question": "Find max salary per department",
        "sampleTables": [
            {
                "tableName": "employees",
                "columns": [
                    {
                        "columnName": "dept",
                        "dataType": "TEXT"
                    },
                    {
                        "columnName": "salary",
                        "dataType": "INTEGER"
                    }
                ],
                "rows": [
                    {
                        "dept": "HR",
                        "salary": 50000
                    },
                    {
                        "dept": "HR",
                        "salary": 70000
                    },
                    {
                        "dept": "IT",
                        "salary": 90000
                    }
                ]
            }
        ],
        "expectedOutput": {
            "type": "table",
            "value": [
                {
                    "dept": "HR",
                    "salary": 70000
                },
                {
                    "dept": "IT",
                    "salary": 90000
                }
            ]
        },
        "acceptance_rate": 53,
        "referenceQuery": "SELECT dept, MAX(salary) as salary FROM employees GROUP BY dept;"
    },
    {
        "title": "Inactive Users",
        "description": "Easy",
        "question": "Find users not active",
        "sampleTables": [
            {
                "tableName": "users",
                "columns": [
                    {
                        "columnName": "name",
                        "dataType": "TEXT"
                    },
                    {
                        "columnName": "active",
                        "dataType": "INTEGER"
                    }
                ],
                "rows": [
                    {
                        "name": "A",
                        "active": 1
                    },
                    {
                        "name": "B",
                        "active": 0
                    }
                ]
            }
        ],
        "expectedOutput": {
            "type": "column",
            "value": [
                "B"
            ]
        },
        "acceptance_rate": 75,
        "referenceQuery": "SELECT name FROM users WHERE active = 0;"
    },
    {
        "title": "Total Items Sold",
        "description": "Easy",
        "question": "Count sold items",
        "sampleTables": [
            {
                "tableName": "sales",
                "columns": [
                    {
                        "columnName": "id",
                        "dataType": "INTEGER"
                    }
                ],
                "rows": [
                    {
                        "id": 1
                    },
                    {
                        "id": 2
                    },
                    {
                        "id": 3
                    }
                ]
            }
        ],
        "expectedOutput": {
            "type": "count",
            "value": 3
        },
        "acceptance_rate": 48,
        "referenceQuery": "SELECT COUNT(*) FROM sales;"
    },
    {
        "title": "Customers Without Orders",
        "description": "Hard",
        "question": "Find customers without orders",
        "sampleTables": [
            {
                "tableName": "customers",
                "columns": [
                    {
                        "columnName": "id",
                        "dataType": "INTEGER"
                    }
                ],
                "rows": [
                    {
                        "id": 1
                    },
                    {
                        "id": 2
                    }
                ]
            },
            {
                "tableName": "orders",
                "columns": [
                    {
                        "columnName": "customer_id",
                        "dataType": "INTEGER"
                    }
                ],
                "rows": [
                    {
                        "customer_id": 1
                    }
                ]
            }
        ],
        "expectedOutput": {
            "type": "column",
            "value": [
                2
            ]
        },
        "acceptance_rate": 51,
        "referenceQuery": "SELECT id FROM customers WHERE id NOT IN (SELECT customer_id FROM orders);"
    },
    {
        "title": "Average Order Value Per Customer",
        "description": "Medium",
        "question": "Average order amount per customer",
        "sampleTables": [
            {
                "tableName": "orders",
                "columns": [
                    {
                        "columnName": "customer_id",
                        "dataType": "INTEGER"
                    },
                    {
                        "columnName": "amount",
                        "dataType": "REAL"
                    }
                ],
                "rows": [
                    {
                        "customer_id": 1,
                        "amount": 100
                    },
                    {
                        "customer_id": 1,
                        "amount": 300
                    },
                    {
                        "customer_id": 2,
                        "amount": 200
                    }
                ]
            }
        ],
        "expectedOutput": {
            "type": "table",
            "value": [
                {
                    "customer_id": 1,
                    "avg": 200
                },
                {
                    "customer_id": 2,
                    "avg": 200
                }
            ]
        },
        "acceptance_rate": 46,
        "referenceQuery": "SELECT customer_id, AVG(amount) as avg FROM orders GROUP BY customer_id;"
    }
];
