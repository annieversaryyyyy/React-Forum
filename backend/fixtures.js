const mongoose = require('mongoose');
const {nanoid} = require('nanoid');
const config = require('./config');

const User = require('./models/User');
const Post = require('./models/Post');
const Comment = require('./models/Comment');

const run = async () => {
    await mongoose.connect(config.mongo.db);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [admin, root, john] = await User.create({
        username: 'admin',
        password: 'admin',
        token: nanoid(),
    }, {
        username: 'root',
        password: 'root',
        token: nanoid(),
    },{
        username: 'john',
        password: 'john',
        token: nanoid()
    });

    const [rick, witcher, jujutsu] = await Post.create({
        author: admin._id,
        title: 'Рик и Морти',
        description: '«Рик и Морти» — американский комедийный научно-фантастический анимационный сериал для взрослых, созданный Джастином Ройландом и Дэном Хармоном и выпускаемый в рамках блока Adult Swim на телеканале Cartoon Network.',
        image: 'fixtures/rick.jpg',
        datetime: new Date().toISOString(),
    },{
        author: root._id,
        title: 'Ведьмак',
        description: '«Ведьмак» — американо-польский фэнтезийный телесериал, снятый по мотивам одноименной серии романов Анджея Сапковского. Премьера первого сезона состоялась на стриминг-сервисе Netflix 20 декабря 2019 года, премьера второго сезона — 17 декабря 2021 года. В сентябре 2021 года был анонсирован третий сезон.',
        image: 'fixtures/witcher.jpg',
        datetime: new Date().toISOString(),
    },{
        author: john._id,
        title: 'Jujutsu Kaisen',
        description: 'Jujutsu Kaisen — серия японских манг, написанная и проиллюстрированная Гэгэ Акутами. Он публикуется в журнале сёнэн-манги Shueisha Weekly Shōnen Jump с марта 2018 года, а его главы собраны и опубликованы в 20 томах танкобон по состоянию на август 2022 года.',
        image: 'fixtures/jujutsu.jpg',
        datetime: new Date().toISOString(),
    },);

    await Comment.create({
        user: admin._id,
        description: 'Лучший мультик',
        post: rick._id
    }, {
        user: root._id,
        description: 'Ведьмак топ!',
        post: witcher._id
    },{
        user: john._id,
        description: 'Магическая битва вперед!',
        post: jujutsu._id
    });

    await mongoose.connection.close();
};

run().catch(console.error);