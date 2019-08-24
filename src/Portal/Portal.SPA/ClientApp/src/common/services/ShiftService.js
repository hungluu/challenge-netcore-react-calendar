import { RRule, rrulestr } from 'rrule'

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
    }
}

export default ShiftService