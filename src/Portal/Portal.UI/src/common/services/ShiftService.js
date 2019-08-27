import { RRule, rrulestr } from 'rrule'
import moment from 'moment'

const ShiftService = {
    getRuleObject (ruleString) {
        return ruleString
            ? rrulestr(ruleString)
            : null
    },

    getRuleString (ruleObject) {
        const rule = new RRule(ruleObject)

        return rule.toString()
    },

    getWeekDays (ruleString) {
        if (ruleString) {
            const rule = this.getRuleObject(ruleString)

            return {
                monday: rule.options.byweekday.includes(RRule.MO.weekday),
                tuesday: rule.options.byweekday.includes(RRule.TU.weekday),
                wednesday: rule.options.byweekday.includes(RRule.WE.weekday),
                thursday: rule.options.byweekday.includes(RRule.TH.weekday),
                friday: rule.options.byweekday.includes(RRule.FR.weekday),
                saturday: rule.options.byweekday.includes(RRule.SA.weekday),
                sunday: rule.options.byweekday.includes(RRule.SU.weekday)
            }
        } else {
            return {
                monday: true,
                tuesday: true,
                wednesday: true,
                thursday: true,
                friday: true,
                saturday: true,
                sunday: true
            }
        }
    },

    getWeekDayValues (weekDays) {
        const rruleWeekDayValues = {
            monday: RRule.MO.weekday,
            tuesday: RRule.TU.weekday,
            wednesday: RRule.WE.weekday,
            thursday: RRule.TH.weekday,
            friday: RRule.FR.weekday,
            saturday: RRule.SA.weekday,
            sunday: RRule.SU.weekday
        }
        const weekDayValues = []

        for (var dayId in rruleWeekDayValues) {
            if (weekDays[dayId]) {
                weekDayValues.push(rruleWeekDayValues[dayId])
            }
        }

        return weekDayValues
    },

    getRuleDuration (ruleString) {
        const rule = this.getRuleObject(ruleString)
        let startDate,
            endDate

        if (!rule || !rule.options.dtstart || !rule.options.until) {
            return null
        }

        startDate = moment.utc(rule.options.dtstart)
        endDate = moment.utc(rule.options.until)
            .set('year', startDate.year())
            .set('month', startDate.month())
            .set('day', startDate.day())

        return moment.duration(endDate.diff(startDate))
    }
}

export default ShiftService