--Roles
INSERT  INTO roles VALUES (1,'Policeman','Policeman') ON CONFLICT DO NOTHING;
INSERT  INTO roles VALUES (2,'Municipality','Municipality') ON CONFLICT DO NOTHING;
INSERT  INTO roles VALUES (3,'Driver', 'Driver') ON CONFLICT DO NOTHING;
INSERT  INTO roles VALUES (4,'Tow Truck','Tow Truck') ON CONFLICT DO NOTHING;