// Mocks
import { animation } from './mocks/animation.mock'
import { badge } from './mocks/badge.mock'
import { parcours } from './mocks/parcours.mock'
import { point } from './mocks/point.mock'
import { qcm } from './mocks/qcm.mock'
import { simpleQuestion } from './mocks/simpleQuestion.mock'
import { token } from './mocks/token.mock'
import { user } from './mocks/utilisateur.mock'
import { userbadge } from './mocks/userbadge.mock'

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
import { ParcoursPoint } from '~/modules/Models/parcoursPoint.model'
import { parcourspoint } from './mocks/parcoursPoint.mock'
import { UserBadge } from '~/modules/Models/userBadge.model'

export const relations = () => {
    User.hasMany(Token, { foreignKey: 'id_pseudo' })
    Token.belongsTo(User, { foreignKey: 'id_pseudo' })

    Animation.hasMany(SimpleQuestion, { foreignKey: 'id_animation' })
    SimpleQuestion.belongsTo(Animation, { foreignKey: 'id_animation' })

    Animation.hasMany(QCM, { foreignKey: 'id_animation' })
    QCM.belongsTo(Animation, { foreignKey: 'id_animation' })

    Parcours.hasOne(Badge, { foreignKey: 'id_parcours' })
    Badge.belongsTo(Parcours, { foreignKey: 'id_parcours' })

    Animation.hasMany(Parcours, { foreignKey: 'id_animation' })
    Parcours.belongsTo(Animation, { foreignKey: 'id_animation' })

    User.belongsToMany(Badge, { through: 'userbadge' })
    Badge.belongsToMany(User, { through: 'userbadge' })

    Parcours.belongsToMany(Point, { through: 'parcourspoint' })
    Point.belongsToMany(Parcours, { through: 'parcourspoint' })
};

export const initDb = () => {
    return sequelize.sync({ force: true }).then(() => {
        point.forEach((point) => {
            Point.create({
                name: point.name,
                main_description: point.main_description,
                small_description: point.small_description,
                lon: point.lon,
                lat: point.lat,
                qrcode: point.qrcode,
            })
        })

        animation.forEach((animation) => {
            Animation.create({
                name: animation.name,
            }).then((response: { toJSON: () => string }) => console.log(response.toJSON()));
        })
        
                parcours.forEach((parcours) => {
                    Parcours.create({
                        name: parcours.name,
                        id_animation: parcours.id_animation,
                    }).then((createdParcours) => {
                        console.log(createdParcours.toJSON());
        
                        parcourspoint.forEach((parcoursPoint) => {
                            if (parcoursPoint.id_parcours === createdParcours.id_parcours) {
                                ParcoursPoint.create({
                                    parcourIdParcours: parcoursPoint.id_parcours,
                                    pointIdPoint: parcoursPoint.id_point,
                                }).then((response: { toJSON: () => string }) => console.log(response.toJSON()));
                            }
                        });
                    });
                })

        badge.forEach((badge) => {
            Badge.create({
                name: badge.name,
                image: badge.image,
                id_parcours: badge.id_parcours,
            }).then((response: { toJSON: () => string }) => console.log(response.toJSON()))
        })

        qcm.forEach((qcm) => {
            QCM.create({
                question: qcm.question,
                correct_response: qcm.correct_response,
                optiona: qcm.optiona,
                optionb: qcm.optionb,
                optionc: qcm.optionc,
                optiond: qcm.optiond,
                id_animation: qcm.id_animation
            }).then((response: { toJSON: () => string }) => console.log(response.toJSON()))
        })

        simpleQuestion.forEach((simpleQuestion) => {
            SimpleQuestion.create({
                question: simpleQuestion.question,
                response: simpleQuestion.response,
                id_animation: simpleQuestion.id_animation
            }).then((response: { toJSON: () => string }) => console.log(response.toJSON()))
        })

        token.forEach((token) => {
            Token.create({
                userId: token.id_pseudo,
                refresh_token: token.refresh_token
            }).then((response: { toJSON: () => string }) => console.log(response.toJSON()))
        })

        user.forEach((user) => {
            User.create({
                pseudo: user.pseudo,
                password: user.password,
                email: user.email,
                birthdate: user.birthdate,
                city: user.city,
                zip_code: user.zip_code
            }).then((createdUser) => {
                console.log(createdUser.toJSON());

                userbadge.forEach((userBadge) => {
                    if (userBadge.id_pseudo === createdUser.id_pseudo) {
                        UserBadge.create({
                            utilisateurIdPseudo: userBadge.id_pseudo,
                            badgeIdBadge: userBadge.id_badge,
                        }).then((response: { toJSON: () => string }) => console.log(response.toJSON()));
                    }
                });
            });
        })

        console.log('Database successfully initialized.')

    })
}
