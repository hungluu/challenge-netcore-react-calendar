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
                monday: rule.byweekday.includes(RRule.MO),
                tuesday: rule.byweekday.includes(RRule.TU),
                wednesday: rule.byweekday.includes(RRule.WE),
                thursday: rule.byweekday.includes(RRule.TH),
                friday: rule.byweekday.includes(RRule.FR),
                saturday: rule.byweekday.includes(RRule.SA),
                sunday: rule.byweekday.includes(RRule.SU)
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
            monday: RRule.MO,
            tuesday: RRule.TU,
            wednesday: RRule.WE,
            thursday: RRule.TH,
            friday: RRule.FR,
            saturday: RRule.SA,
            sunday: RRule.SU
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