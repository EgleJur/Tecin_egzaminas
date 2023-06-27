INSERT INTO MEAL_TABLE (NAME, DESCRIPTION) VALUES
    ('Cepelinai', 'Tradiciškas lietuviškas patiekalas, kiaulienos ir bulvių tešlos'),
('Šaltibarščiai', 'Gaivus šviežių daržovių ir raugintų burokėlių sriubos patiekalas'),
('Kugelis', 'Bulvių košė su kiaulienos spirguciais, itin populiari lietuvių virtuvėje'),
('Šakotis', 'Populiarus lietuviškas pyragas su daugybe sluoksnių ir skrudinta tešla'),
('Balandėliai', 'Mėsainiai iš maltos jautienos su ryžiais, susuktos kopūstų lapais'),
('Šaltiena', 'Tradiciškas šalta mėsos sriuba su virtais kiaušiniais ir šviežiomis daržovėmis'),
('Kibinai', 'Kaukaziečių kilmės patiekalas – žemaičių virtinukai su mėsa ir daržovėmis'),
('Bulviniai blynai', 'Bulvėmis pagaminti blynai su įvairiais padažais ir užpildais');

INSERT INTO ORDERING_MEALS (MEAL_ID, ORDERING_ID, QUANTITY)
VALUES (1, 4, 1), (1, 5, 1), (2, 3, 2), (2, 5, 2), (3, 1, 1), (3, 3, 2);

INSERT INTO MEALS_IN_MENU (MEAL_ID, MENU_ID) VALUES
                                                 (1, 1),
                                                 (1, 2),
                                                 (1, 3),
                                                 (2, 2),
                                                 (2, 4),
                                                 (3, 1);
