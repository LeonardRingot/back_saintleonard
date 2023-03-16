// Mocks
import { animation } from './mocks/animation.mock'
import { badge } from './mocks/badge.mock'
import { parcours } from './mocks/parcours.mock'
import { point } from './mocks/point.mock'
import { qcm } from './mocks/qcm.mock'
import { simpleQuestion } from './mocks/simpleQuestion.mock'
import { token } from './mocks/token.mock'
import { user } from './mocks/utilisateur.mock'

// models
import { Animation } from "~/modules/Models/animation.model";
import { Badge } from "~/modules/Models/badge.model";
import { Parcours } from "~/modules/Models/parcours.model";
import { Point } from "~/modules/Models/points.model";
import { QCM } from "~/modules/Models/qcm.model";
import { SimpleQuestion } from "~/modules/Models/simpleQuestion.model";
import { Token } from "~/modules/Models/token.model";
import { User } from "~/modules/Models/utilisateur.model";
import sequelize from './sequelize'

export const relations = () => {
    User.hasMany(Token, { foreignKey: 'id_pseudo' })
    Token.belongsTo(User, { foreignKey: 'id_pseudo' })

    Point.hasMany(Animation, { foreignKey: 'id_point' })
    Animation.belongsTo(Point, { foreignKey: 'id_point' })

    Point.hasOne(Badge, { foreignKey: 'id_point' })
    Badge.belongsTo(Point, { foreignKey: 'id_point' })

    User.belongsToMany(Point, { through: 'scanner' })
    Point.belongsToMany(User, { through: 'scanner' })

    User.belongsToMany(Badge, { through: 'obtenir' })
    Badge.belongsToMany(User, { through: 'obtenir' })

    Parcours.belongsToMany(Point, { through: 'associer' })
    Point.belongsToMany(Parcours, { through: 'associer' })

    Animation.belongsToMany(SimpleQuestion, { through: 'poser' })
    SimpleQuestion.belongsToMany(Animation, { through: 'poser' })

    Animation.belongsToMany(QCM, { through: 'detenir' })
    QCM.belongsToMany(Animation, { through: 'detenir' })
};

export const initDb = () => {
    return sequelize.sync({ force: true }).then(() => {
        point.map((point) => {
            Point.create({
                name: point.name,
                main_description: point.main_description,
                small_description: point.small_description,
                lon: point.lon,
                lat: point.lat,
                qrcode: point.qrcode,
            }).then((response: { toJSON: () => string }) => console.log(response.toJSON()))
        })

        animation.map((animation) => {
            Animation.create({
                name: animation.name,
                id_point: animation.id_point,
            }).then((response: { toJSON: () => string }) => console.log(response.toJSON()))
        })

        badge.map((badge) => {
            Badge.create({
                name: badge.name,
                image: badge.image,
                id_point: badge.id_point,
            }).then((response: { toJSON: () => string }) => console.log(response.toJSON()))
        })

        parcours.map((parcours) => {
            Parcours.create({
                name: parcours.name
            }).then((response: { toJSON: () => string }) => console.log(response.toJSON()))
        })

        qcm.map((qcm) => {
            QCM.create({
                question: qcm.question,
                correct_response: qcm.correct_response,
                optiona: qcm.optiona,
                optionb: qcm.optionb,
                optionc: qcm.optionc,
                optiond: qcm.optiond,
            }).then((response: { toJSON: () => string }) => console.log(response.toJSON()))
        })

        simpleQuestion.map((simpleQuestion) => {
            SimpleQuestion.create({
                question: simpleQuestion.question,
                response: simpleQuestion.response
            }).then((response: { toJSON: () => string }) => console.log(response.toJSON()))
        })

        token.map((token) => {
            Token.create({
                userId: token.id_pseudo,
                refresh_token: token.refresh_token
            }).then((response: { toJSON: () => string }) => console.log(response.toJSON()))
        })

        user.map((user) => {
            User.create({
                pseudo: user.pseudo,
                password: user.password,
                email: user.email,
                age: user.age,
            })
        })

        console.log('Database successfully initialized.')

    })
}
