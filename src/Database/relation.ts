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
import { animationqcm } from './mocks/animationqcm.mock'
import { AnimationQcm } from '~/modules/Models/animationqcm.model'
import { animationsq } from './mocks/animationsq.mock'
import { AnimationSq } from '~/modules/Models/animationsq.model'

export const relations = () => {
    User.hasMany(Token, { foreignKey: 'id_pseudo' })
    Token.belongsTo(User, { foreignKey: 'id_pseudo' })

    Point.hasMany(Animation, { foreignKey: 'id_point' })
    Animation.belongsTo(Point, { foreignKey: 'id_point' })

    Point.hasOne(Badge, { foreignKey: 'id_point' })
    Badge.belongsTo(Point, { foreignKey: 'id_point' })

    User.belongsToMany(Badge, { through: 'userbadge' })
    Badge.belongsToMany(User, { through: 'userbadge' })

    Parcours.belongsToMany(Point, { through: 'parcourspoint' })
    Point.belongsToMany(Parcours, { through: 'parcourspoint' })

    Parcours.belongsToMany(Animation, { through: 'parcoursanimation' })
    Animation.belongsToMany(Parcours, { through: 'parcoursanimation' })

    Animation.belongsToMany(SimpleQuestion, { through: 'animationsq' })
    SimpleQuestion.belongsToMany(Animation, { through: 'animationsq' })

    Animation.belongsToMany(QCM, { through: 'animationqcm' })
    QCM.belongsToMany(Animation, { through: 'animationqcm' })
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

        parcours.forEach((parcours) => {
            Parcours.create({
                name: parcours.name
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

        animation.forEach((animation) => {
            Animation.create({
                name: animation.name,
                id_point: animation.id_point,
            }).then((createdAnimation) => {
                console.log(createdAnimation.toJSON());

                animationqcm.forEach((animQcm) => {
                    if(animQcm.id_animation === createdAnimation.id_animation) {
                        AnimationQcm.create({
                            animationIdAnimation: animQcm.id_animation,
                            qcmIdQcm: animQcm.id_qcm
                        }).then((response: { toJSON: () => string }) => console.log(response.toJSON()));
                    }
                });

                animationsq.forEach((animSq) => {
                    if(animSq.id_animation === createdAnimation.id_animation) {
                        AnimationSq.create({
                            animationIdAnimation: animSq.id_animation,
                            simpleQuestionIdSimpleQuestion: animSq.id_simple_question
                        }).then((response: { toJSON: () => string }) => console.log(response.toJSON()));
                    }
                });
            });
        })

        badge.forEach((badge) => {
            Badge.create({
                name: badge.name,
                image: badge.image,
                id_point: badge.id_point,
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
            }).then((response: { toJSON: () => string }) => console.log(response.toJSON()))
        })

        simpleQuestion.forEach((simpleQuestion) => {
            SimpleQuestion.create({
                question: simpleQuestion.question,
                response: simpleQuestion.response
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
