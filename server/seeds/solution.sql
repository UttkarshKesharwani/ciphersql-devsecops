-- Solution SQL Queries for Seeded Assignments (cipherSQL)

-- 1. Employees in Engineering
-- Question: List employees working in Engineering department
SELECT * FROM employees WHERE department = 'Engineering';

-- 2. Count Employees
-- Question: Count total employees
SELECT COUNT(*) FROM employees;

-- 3. Average Salary
-- Question: Find average salary
SELECT AVG(salary) FROM employees;

-- 4. Orders Above 1000
-- Question: List orders with amount > 1000
SELECT amount FROM orders WHERE amount > 1000;

-- 5. Customer Order Count
-- Question: Find number of orders per customer
SELECT customer_id, COUNT(*) as count FROM orders GROUP BY customer_id;

-- 6. Max Salary
-- Question: Find maximum salary
SELECT MAX(salary) FROM employees;

-- 7. Join Customers and Orders
-- Question: Show customer name with order amount
SELECT customers.name, orders.amount FROM customers JOIN orders ON customers.id = orders.customer_id;

-- 8. Distinct Departments
-- Question: List unique departments
SELECT DISTINCT department FROM employees;

-- 9. Total Revenue
-- Question: Find total revenue
SELECT SUM(amount) FROM orders;

-- 10. Employees Sorted by Salary
-- Question: List employees sorted by salary desc
SELECT name, salary FROM employees ORDER BY salary DESC;

-- 11. Employees With Bonus
-- Question: List employees who received bonus
SELECT id, name, bonus FROM employees WHERE bonus > 0;

-- 12. Products Above Price
-- Question: List products with price greater than 100
SELECT price FROM products WHERE price > 100;

-- 13. Latest Order
-- Question: Find latest order date
SELECT MAX(order_date) FROM orders;

-- 14. Students Above Average Marks
-- Question: List students scoring above average
SELECT name FROM students WHERE marks > (SELECT AVG(marks) FROM students);

-- 15. Department Max Salary
-- Question: Find max salary per department
SELECT dept, MAX(salary) as salary FROM employees GROUP BY dept;

-- 16. Inactive Users
-- Question: Find users not active
SELECT name FROM users WHERE active = 0;

-- 17. Total Items Sold
-- Question: Count sold items
SELECT COUNT(*) FROM sales;

-- 18. Customers Without Orders
-- Question: Find customers without orders
SELECT id FROM customers WHERE id NOT IN (SELECT customer_id FROM orders);

-- 19. Average Order Value Per Customer
-- Question: Average order amount per customer
SELECT customer_id, AVG(amount) as avg FROM orders GROUP BY customer_id;
