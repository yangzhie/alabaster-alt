CREATE DATABASE alabaster_industries

CREATE TABLE watches(
    id SERIAL PRIMARY KEY,
    name TEXT,
    image_url TEXT,
    price INTEGER,
    description TEXT
);

CREATE TABLE objects(
    id SERIAL PRIMARY KEY,
    name TEXT,
    image_url TEXT,
    image_url_1 TEXT,
    image_url_2 TEXT,
    image_url_3 TEXT,
    image_url_4 TEXT,
    image_url_5 TEXT,
    image_url_6 TEXT,
    image_url_7 TEXT,
    image_url_8 TEXT,
    image_url_9 TEXT,
    price INTEGER,
    description TEXT
);

CREATE TABLE accessories(
    id SERIAL PRIMARY KEY,
    name TEXT,
    image_url TEXT,
    image_url_1 TEXT,
    image_url_2 TEXT,
    price INTEGER,
    description TEXT
);

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username TEXT,
    password_digest TEXT,
    user_type TEXT
);

INSERT INTO 
    watches (name, image_url, price, description)
    VALUES ('Meteor Dove in Black Marble', 'https://alabaster.industries/cdn/shop/files/Dec_Allprod_Onblack_0006_AllprodOblack_0003_Layer7.jpg?v=1701833795', 4216.00, 'Descript,ion''s 1');

INSERT INTO 
    watches (name, image_url, price, description)
    VALUES ('Silver Sinew in Blue Agate', 'https://alabaster.industries/cdn/shop/files/Dec_Allprod_Onblack_0008_AllprodOblack_0001_Layer9.jpg?v=1701834124', 3981.00, 'Description 2');

INSERT INTO 
    watches (name, image_url, price, description)
    VALUES ('Gold Core in Eroded Gold', 'https://alabaster.industries/cdn/shop/files/Dec_Allprod_Onblack_0002_AllprodOblack_0007_Layer3.jpg?v=1701833882', 5933.00, 'Description 3');

INSERT INTO 
users(username, password_digest, user_type) 
VALUES ('user', 'pass', 'public');

INSERT INTO 
    objects (name, image_url, image_url_1, image_url_2, image_url_3, image_url_4, image_url_5, image_url_6, image_url_7, image_url_8, image_url_9, price, description)
    VALUES ('Torsion Lighter Case', 'https://alabaster.industries/cdn/shop/products/lighter_SCIFI_medium_4d131cb4-8cf2-4a73-a47c-c4913c7d790f.jpg?v=1647549852', 'https://alabaster.industries/cdn/shop/products/lighter_SCIFI_medium_4d131cb4-8cf2-4a73-a47c-c4913c7d790f.jpg?v=1647549852', 'https://alabaster.industries/cdn/shop/products/Button_detail_medium_545a4888-e806-4645-aa02-876d96088077.jpg?v=1647549854', 'https://alabaster.industries/cdn/shop/products/BottomLogoDetail_medium_416be142-b21c-490d-8ee3-1081abb92691.jpg?v=1647549852', 'https://alabaster.industries/cdn/shop/products/BkackTest2.jpg?v=1647549853', 'https://alabaster.industries/cdn/shop/products/lighterTOPDOWN.jpg?v=1647549853', 'https://alabaster.industries/cdn/shop/products/ButtonSolo.jpg?v=1647549853', 'https://alabaster.industries/cdn/shop/products/AllExp_LighterProd_button_0003_Layer3.jpg?v=1647549854', 'https://alabaster.industries/cdn/shop/products/AllExp_LighterProd_button_0004_Layer2.jpg?v=1647549853', 'https://alabaster.industries/cdn/shop/products/AllExp_LighterProd_button_0005_Layer1.jpg?v=1647549853', 1523.00, 'Description 1');

INSERT INTO 
    accessories (name, image_url, image_url_1, image_url_2, price, description)
    VALUES ('Kestrel Glasses in Silver and Pink', 'https://alabaster.industries/cdn/shop/files/Pink_Alabaster_Glasses2Large.jpg?v=1701834825', 'https://alabaster.industries/cdn/shop/files/Pink_Alabaster_Glasses2Large.jpg?v=1701834825','https://alabaster.industries/cdn/shop/files/Pink_Alabaster_Glasses_SideLarge.jpg?v=1701834825' , 1847.00, 'Description 1');

INSERT INTO 
    accessories (name, image_url, image_url_1, image_url_2, price, description)
    VALUES ('Kestrel Glasses in Silver and Transparent', 'https://alabaster.industries/cdn/shop/files/Clear_Alabaster_GlassesLarge.jpg?v=1701834875','https://alabaster.industries/cdn/shop/files/Clear_Alabaster_GlassesLarge.jpg?v=1701834875','https://alabaster.industries/cdn/shop/files/Clear_Alabaster_Glasses_SideLarge.jpg?v=1701834875' , 1847.00, 'Description 1');

INSERT INTO 
    accessories (name, image_url, image_url_1, image_url_2, price, description)
    VALUES ('Kestrel Glasses in Gunmetal', 'https://alabaster.industries/cdn/shop/files/Grey_Alabaster_GlassesMedium.jpg?v=1701834991', 'https://alabaster.industries/cdn/shop/files/Grey_Alabaster_GlassesMedium.jpg?v=1701834991','https://alabaster.industries/cdn/shop/files/Grey_Alabaster_Glasses_SideMedium.jpg?v=1701834991' , 1847.00, 'Description 1');
