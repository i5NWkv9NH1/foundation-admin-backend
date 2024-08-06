CREATE TABLE organization (
  id SERIAL PRIMARY KEY,
  label VARCHAR(255) NOT NULL,
  parentId INTEGER REFERENCES organization(id),
  type VARCHAR(255),
  icon VARCHAR(255),
  path TEXT
);

CREATE TABLE organization_closure (
  id SERIAL PRIMARY KEY,
  ancestorId INTEGER REFERENCES organization(id),
  descendantId INTEGER REFERENCES organization(id),
  depth INTEGER
);

-- 插入根节点
INSERT INTO organization (label, type, icon, path) VALUES ('公司', 'company', 'company-icon', '/company') RETURNING id;

-- 插入子节点
INSERT INTO organization (label, parentId, type, icon, path) VALUES ('销售部门', root_id, 'department', 'sales-icon', '/company/sales') RETURNING id;
INSERT INTO organization (label, parentId, type, icon, path) VALUES ('人力资源部门', root_id, 'department', 'hr-icon', '/company/hr') RETURNING id;

-- 插入小组
INSERT INTO organization (label, parentId, type, icon, path) VALUES ('销售小组A', sales_dept_id, 'team', 'sales-team-a-icon', '/company/sales/team-a') RETURNING id;
INSERT INTO organization (label, parentId, type, icon, path) VALUES ('销售小组B', sales_dept_id, 'team', 'sales-team-b-icon', '/company/sales/team-b') RETURNING id;
INSERT INTO organization (label, parentId, type, icon, path) VALUES ('HR小组A', hr_dept_id, 'team', 'hr-team-a-icon', '/company/hr/team-a') RETURNING id;
INSERT INTO organization (label, parentId, type, icon, path) VALUES ('HR小组B', hr_dept_id, 'team', 'hr-team-b-icon', '/company/hr/team-b') RETURNING id;

-- 根组织与直接子组织
INSERT INTO organization_closure (ancestorId, descendantId, depth) VALUES (root_id, sales_dept_id, 1);
INSERT INTO organization_closure (ancestorId, descendantId, depth) VALUES (root_id, hr_dept_id, 1);

-- 子组织与小组
INSERT INTO organization_closure (ancestorId, descendantId, depth) VALUES (sales_dept_id, sales_team_a_id, 1);
INSERT INTO organization_closure (ancestorId, descendantId, depth) VALUES (sales_dept_id, sales_team_b_id, 1);
INSERT INTO organization_closure (ancestorId, descendantId, depth) VALUES (hr_dept_id, hr_team_a_id, 1);
INSERT INTO organization_closure (ancestorId, descendantId, depth) VALUES (hr_dept_id, hr_team_b_id, 1);

-- 根组织与小组
INSERT INTO organization_closure (ancestorId, descendantId, depth) VALUES (root_id, sales_team_a_id, 2);
INSERT INTO organization_closure (ancestorId, descendantId, depth) VALUES (root_id, sales_team_b_id, 2);
INSERT INTO organization_closure (ancestorId, descendantId, depth) VALUES (root_id, hr_team_a_id, 2);
INSERT INTO organization_closure (ancestorId, descendantId, depth) VALUES (root_id, hr_team_b_id, 2);

-- 查询子节点
SELECT descendantId FROM organization_closure WHERE ancestorId = ?;

-- 查询父节点
SELECT ancestorId FROM organization_closure WHERE descendantId = ?;

-- 更新节点
UPDATE organization SET label = '新名称' WHERE id = ?;

-- 删除节点
DELETE FROM organization WHERE id = ?;
DELETE FROM organization_closure WHERE ancestorId = ? OR descendantId = ?;
