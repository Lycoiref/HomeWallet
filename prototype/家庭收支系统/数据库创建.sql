-- 创建用户表
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT, -- 用户ID，主键，自增
  name VARCHAR(50) NOT NULL, -- 姓名，不为空
  gender ENUM('Male', 'Female') NOT NULL, -- 性别，只能是Male或Female
  birthdate DATE NOT NULL, -- 出生日期，不为空
  id_number VARCHAR(20) NOT NULL, -- 身份证号码，不为空
  phone_number VARCHAR(20) NOT NULL, -- 手机号码，不为空
  email VARCHAR(50) NOT NULL, -- 电子邮件，不为空
  education VARCHAR(50) NOT NULL, -- 教育程度，不为空
  occupation VARCHAR(50) NOT NULL, -- 职业，不为空
  marital_status ENUM('Single', 'Married', 'Divorced', 'Widowed') NOT NULL, -- 婚姻状况，只能是Single、Married、Divorced、Widowed
  children_status ENUM('None', 'Has Children') NOT NULL, -- 子女情况，只能是None或Has Children
  has_mortgage ENUM('Yes', 'No') NOT NULL -- 是否有房贷，只能是Yes或No
);

-- 创建支出类别表
CREATE TABLE expensecategories (
  id INT PRIMARY KEY AUTO_INCREMENT, -- 类别ID，主键，自增
  category_name VARCHAR(50) NOT NULL, -- 类别名称，不为空
  description VARCHAR(100) -- 描述
);

-- 创建收入表
CREATE TABLE income (
  id INT AUTO_INCREMENT PRIMARY KEY, -- 收入ID，主键，自增
  user_id INT NOT NULL, -- 用户ID，不为空
  category_id INT NOT NULL, -- 类别ID，不为空
  amount DECIMAL(10, 2) NOT NULL, -- 金额，不为空
  date DATE NOT NULL, -- 日期，不为空
  description VARCHAR(255), -- 描述
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- 创建时间，默认为当前时间
  FOREIGN KEY (user_id) REFERENCES users(id), -- 外键关联用户表
  FOREIGN KEY (category_id) REFERENCES expensecategories(id) -- 外键关联支出类别表
);

-- 创建支出表
CREATE TABLE expenditures (
  id INT AUTO_INCREMENT PRIMARY KEY, -- 支出ID，主键，自增
  user_id INT NOT NULL, -- 用户ID，不为空
  amount DECIMAL(10, 2) NOT NULL, -- 金额，不为空
  category_id INT NOT NULL, -- 类别ID，不为空
  date DATE NOT NULL, -- 日期，不为空
  description VARCHAR(100), -- 描述
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- 创建时间，默认为当前时间
  FOREIGN KEY (user_id) REFERENCES users(id), -- 外键关联用户表
  FOREIGN KEY (category_id) REFERENCES expensecategories(id) -- 外键关联支出类别表
);
