

"/loginpwd" 密码登录接口

|      |       成功       | 失败                         |
| ---- | :--------------: | ---------------------------- |
| 入参 | userTel, userPwd |                              |
| 出参 |   200:登录成功   | 401:密码错误；404:用户不存在 |

**user表**

1. User ID (user_id)：每个用户在系统中应该有一个唯一的标识符。
2. Username (username)：用户在系统中使用的用户名。
3. pwd (password)：用户在系统中使用的密码。
4. Full Name (full_name)：用户的真实姓名。
5. Email Address (email)：用户的电子邮件地址，用于与用户进行联系。
6. Phone Number (phone)：用户的电话号码，也可用于与用户进行联系。
7. Address (address)：用户的地址，包括国家、省/州、城市、邮政编码等信息。
8. Gender (gender)：用户的性别。
9. Date of Birth (dob)：用户的出生日期。
10. Registration Date (reg_date)：用户在系统中注册的日期。
11. Last Login Time (last_login)：用户最后一次登录系统的时间。
12. User Role (role)：用户在系统中扮演的角色，如管理员、普通用户等。
13. Account Status (status)：用户在系统中的账户状态，如激活、禁用等。
14. Other Personal Information (other_info)：如身份证号码、职业、兴趣爱好等。
14. tel 用户手机号