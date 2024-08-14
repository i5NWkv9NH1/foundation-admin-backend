INSERT INTO sys_organization (label, type, icon, parent_id) VALUES
('公司', '公司', 'mdi-office-building', NULL),
('IT部门', '部门', 'mdi-laptop', (SELECT id FROM sys_organization WHERE label = '公司')),
('营销部门', '部门', 'mdi-bullhorn', (SELECT id FROM sys_organization WHERE label = '公司')),
('开发部', '部门', 'mdi-code-braces', (SELECT id FROM sys_organization WHERE label = 'IT部门')),
('测试部', '部门', 'mdi-bug', (SELECT id FROM sys_organization WHERE label = 'IT部门')),
('市场部', '部门', 'mdi-chart-bar', (SELECT id FROM sys_organization WHERE label = '营销部门'));

INSERT INTO sys_account (name, username, avatar_url, gender, state, phone, address, password, email) VALUES
('Sora', 'sora', 'https://example.com/avatar/sora.jpg', 'FEMALE', 'NORMAL', '1234567890', '123 Street, City', 'password123', 'sora@example.com'),
('Jannarin', 'jannarin', 'https://example.com/avatar/jannarin.jpg', 'FEMALE', 'NORMAL', '0987654321', '456 Avenue, City', 'password123', 'jannarin@example.com'),
('Admin', 'admin', 'https://example.com/avatar/admin.jpg', 'MALE', 'NORMAL', '1122334455', '789 Road, City', 'adminpassword', 'admin@example.com');

INSERT INTO sys_role (name) VALUES
('管理员'),
('运营'),
('开发');

INSERT INTO sys_menu (label, router, icon, parent_id) VALUES
('系统管理', '$', 'mdi-view-dashboard', NULL),
('用户管理', '$/user-management', 'mdi-account-group', (SELECT id FROM sys_menu WHERE label = '系统管理')),
('角色管理', '$/role-management', 'mdi-account-cog', (SELECT id FROM sys_menu WHERE label = '系统管理')),
('组织管理', '$/organization-management', 'mdi-domain', (SELECT id FROM sys_menu WHERE label = '系统管理'));

INSERT INTO sys_action (name, code, icon, menu_id) VALUES
('查看用户', 'view_user', 'mdi-eye', (SELECT id FROM sys_menu WHERE label = '用户管理')),
('创建用户', 'create_user', 'mdi-account-plus', (SELECT id FROM sys_menu WHERE label = '用户管理')),
('编辑用户', 'edit_user', 'mdi-pencil', (SELECT id FROM sys_menu WHERE label = '用户管理')),
('删除用户', 'delete_user', 'mdi-account-remove', (SELECT id FROM sys_menu WHERE label = '用户管理')),
('查看角色', 'view_role', 'mdi-account', (SELECT id FROM sys_menu WHERE label = '角色管理')),
('创建角色', 'create_role', 'mdi-account-plus', (SELECT id FROM sys_menu WHERE label = '角色管理')),
('编辑角色', 'edit_role', 'mdi-pencil', (SELECT id FROM sys_menu WHERE label = '角色管理')),
('删除角色', 'delete_role', 'mdi-account-remove', (SELECT id FROM sys_menu WHERE label = '角色管理')),
('查看组织', 'view_organization', 'mdi-domain', (SELECT id FROM sys_menu WHERE label = '组织管理')),
('创建组织', 'create_organization', 'mdi-domain-plus', (SELECT id FROM sys_menu WHERE label = '组织管理')),
('编辑组织', 'edit_organization', 'mdi-domain-edit', (SELECT id FROM sys_menu WHERE label = '组织管理')),
('删除组织', 'delete_organization', 'mdi-domain-minus', (SELECT id FROM sys_menu WHERE label = '组织管理'));


INSERT INTO sys_account_organization (account_id, organization_id) VALUES
((SELECT id FROM sys_account WHERE username = 'sora'), (SELECT id FROM sys_organization WHERE label = 'IT部门')),
((SELECT id FROM sys_account WHERE username = 'jannarin'), (SELECT id FROM sys_organization WHERE label = '营销部门')),
((SELECT id FROM sys_account WHERE username = 'admin'), (SELECT id FROM sys_organization WHERE label = '公司'));

INSERT INTO sys_account_role (role_id, account_id) VALUES
((SELECT id FROM sys_role WHERE name = '管理员'), (SELECT id FROM sys_account WHERE username = 'sora')),
((SELECT id FROM sys_role WHERE name = '运营'), (SELECT id FROM sys_account WHERE username = 'jannarin')),
((SELECT id FROM sys_role WHERE name = '开发'), (SELECT id FROM sys_account WHERE username = 'admin'));

INSERT INTO sys_role_action (role_id, action_id) VALUES
-- 管理员的权限
((SELECT id FROM sys_role WHERE name = '管理员'), (SELECT id FROM sys_action WHERE code = 'view_user')),
((SELECT id FROM sys_role WHERE name = '管理员'), (SELECT id FROM sys_action WHERE code = 'create_user')),
((SELECT id FROM sys_role WHERE name = '管理员'), (SELECT id FROM sys_action WHERE code = 'edit_user')),
((SELECT id FROM sys_role WHERE name = '管理员'), (SELECT id FROM sys_action WHERE code = 'delete_user')),
((SELECT id FROM sys_role WHERE name = '管理员'), (SELECT id FROM sys_action WHERE code = 'view_role')),
((SELECT id FROM sys_role WHERE name = '管理员'), (SELECT id FROM sys_action WHERE code = 'create_role')),
((SELECT id FROM sys_role WHERE name = '管理员'), (SELECT id FROM sys_action WHERE code = 'edit_role')),
((SELECT id FROM sys_role WHERE name = '管理员'), (SELECT id FROM sys_action WHERE code = 'delete_role')),
((SELECT id FROM sys_role WHERE name = '管理员'), (SELECT id FROM sys_action WHERE code = 'view_organization')),
((SELECT id FROM sys_role WHERE name = '管理员'), (SELECT id FROM sys_action WHERE code = 'create_organization')),
((SELECT id FROM sys_role WHERE name = '管理员'), (SELECT id FROM sys_action WHERE code = 'edit_organization')),
((SELECT id FROM sys_role WHERE name = '管理员'), (SELECT id FROM sys_action WHERE code = 'delete_organization')),

-- 运营的权限
((SELECT id FROM sys_role WHERE name = '运营'), (SELECT id FROM sys_action WHERE code = 'view_user')),
((SELECT id FROM sys_role WHERE name = '运营'), (SELECT id FROM sys_action WHERE code = 'edit_user')),
((SELECT id FROM sys_role WHERE name = '运营'), (SELECT id FROM sys_action WHERE code = 'view_role')),
((SELECT id FROM sys_role WHERE name = '运营'), (SELECT id FROM sys_action WHERE code = 'edit_role')),

-- 开发的权限
((SELECT id FROM sys_role WHERE name = '开发'), (SELECT id FROM sys_action WHERE code = 'view_role')),
((SELECT id FROM sys_role WHERE name = '开发'), (SELECT id FROM sys_action WHERE code = 'create_role')),
((SELECT id FROM sys_role WHERE name = '开发'), (SELECT id FROM sys_action WHERE code = 'view_organization')),
((SELECT id FROM sys_role WHERE name = '开发'), (SELECT id FROM sys_action WHERE code = 'create_organization'));
