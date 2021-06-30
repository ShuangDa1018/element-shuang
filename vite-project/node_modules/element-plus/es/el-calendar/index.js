import { t } from '../locale';
import ElButton from '../el-button';
import ElButtonGroup from '../el-button-group';
import { defineComponent, ref, computed, openBlock, createBlock, Fragment, renderList, toDisplayString, createCommentVNode, createVNode, renderSlot, resolveComponent, withCtx, createTextVNode, createSlots } from 'vue';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import { rangeArr } from '../el-time-picker';

dayjs.extend(localeData);
const getPrevMonthLastDays = (date, amount) => {
  const lastDay = date.subtract(1, "month").endOf("month").date();
  return rangeArr(amount).map((_, index) => lastDay - (amount - index - 1));
};
const getMonthDays = (date) => {
  const days = date.daysInMonth();
  return rangeArr(days).map((_, index) => index + 1);
};
var script = defineComponent({
  props: {
    selectedDay: {
      type: Object
    },
    range: {
      type: Array
    },
    date: {
      type: Object
    },
    hideHeader: {
      type: Boolean
    }
  },
  emits: ["pick"],
  setup(props, ctx) {
    const WEEK_DAYS = ref(dayjs().localeData().weekdaysShort());
    const now = dayjs();
    const firstDayOfWeek = now.$locale().weekStart || 0;
    const toNestedArr = (days) => {
      return rangeArr(days.length / 7).map((_, index) => {
        const start = index * 7;
        return days.slice(start, start + 7);
      });
    };
    const getFormattedDate = (day, type) => {
      let result;
      if (type === "prev") {
        result = props.date.startOf("month").subtract(1, "month").date(day);
      } else if (type === "next") {
        result = props.date.startOf("month").add(1, "month").date(day);
      } else {
        result = props.date.date(day);
      }
      return result;
    };
    const getCellClass = ({ text, type }) => {
      const classes = [type];
      if (type === "current") {
        const date_ = getFormattedDate(text, type);
        if (date_.isSame(props.selectedDay, "day")) {
          classes.push("is-selected");
        }
        if (date_.isSame(now, "day")) {
          classes.push("is-today");
        }
      }
      return classes;
    };
    const pickDay = ({ text, type }) => {
      const date = getFormattedDate(text, type);
      ctx.emit("pick", date);
    };
    const getSlotData = ({ text, type }) => {
      const day = getFormattedDate(text, type);
      return {
        isSelected: day.isSame(props.selectedDay),
        type: `${type}-month`,
        day: day.format("YYYY-MM-DD"),
        date: day.toDate()
      };
    };
    const isInRange = computed(() => {
      return props.range && props.range.length;
    });
    const rows = computed(() => {
      let days = [];
      if (isInRange.value) {
        const [start, end] = props.range;
        const currentMonthRange = rangeArr(end.date() - start.date() + 1).map((_, index) => ({
          text: start.date() + index,
          type: "current"
        }));
        let remaining = currentMonthRange.length % 7;
        remaining = remaining === 0 ? 0 : 7 - remaining;
        const nextMonthRange = rangeArr(remaining).map((_, index) => ({
          text: index + 1,
          type: "next"
        }));
        days = currentMonthRange.concat(nextMonthRange);
      } else {
        const firstDay = props.date.startOf("month").day() || 7;
        const prevMonthDays = getPrevMonthLastDays(props.date, firstDay - firstDayOfWeek).map((day) => ({
          text: day,
          type: "prev"
        }));
        const currentMonthDays = getMonthDays(props.date).map((day) => ({
          text: day,
          type: "current"
        }));
        days = [...prevMonthDays, ...currentMonthDays];
        const nextMonthDays = rangeArr(42 - days.length).map((_, index) => ({
          text: index + 1,
          type: "next"
        }));
        days = days.concat(nextMonthDays);
      }
      return toNestedArr(days);
    });
    const weekDays = computed(() => {
      const start = firstDayOfWeek;
      if (start === 0) {
        return WEEK_DAYS.value;
      } else {
        return WEEK_DAYS.value.slice(start).concat(WEEK_DAYS.value.slice(0, start));
      }
    });
    return {
      isInRange,
      weekDays,
      rows,
      getCellClass,
      pickDay,
      getSlotData
    };
  }
});

const _hoisted_1 = { key: 0 };
const _hoisted_2 = { class: "el-calendar-day" };
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("table", {
    class: {
      "el-calendar-table": true,
      "is-range": _ctx.isInRange
    },
    cellspacing: "0",
    cellpadding: "0"
  }, [
    !_ctx.hideHeader ? (openBlock(), createBlock("thead", _hoisted_1, [
      (openBlock(true), createBlock(Fragment, null, renderList(_ctx.weekDays, (day) => {
        return openBlock(), createBlock("th", { key: day }, toDisplayString(day), 1);
      }), 128))
    ])) : createCommentVNode("v-if", true),
    createVNode("tbody", null, [
      (openBlock(true), createBlock(Fragment, null, renderList(_ctx.rows, (row, index) => {
        return openBlock(), createBlock("tr", {
          key: index,
          class: {
            "el-calendar-table__row": true,
            "el-calendar-table__row--hide-border": index === 0 && _ctx.hideHeader
          }
        }, [
          (openBlock(true), createBlock(Fragment, null, renderList(row, (cell, key) => {
            return openBlock(), createBlock("td", {
              key,
              class: _ctx.getCellClass(cell),
              onClick: ($event) => _ctx.pickDay(cell)
            }, [
              createVNode("div", _hoisted_2, [
                renderSlot(_ctx.$slots, "dateCell", {
                  data: _ctx.getSlotData(cell)
                }, () => [
                  createVNode("span", null, toDisplayString(cell.text), 1)
                ])
              ])
            ], 10, ["onClick"]);
          }), 128))
        ], 2);
      }), 128))
    ])
  ], 2);
}

script.render = render;
script.__file = "packages/calendar/src/date-table.vue";

var script$1 = defineComponent({
  name: "ElCalendar",
  components: {
    DateTable: script,
    ElButton,
    ElButtonGroup
  },
  props: {
    modelValue: {
      type: Date
    },
    range: {
      type: Array,
      validator: (range) => {
        if (Array.isArray(range)) {
          return range.length === 2 && range.every((item) => item instanceof Date);
        }
        return false;
      }
    }
  },
  emits: ["input", "update:modelValue"],
  setup(props, ctx) {
    const selectedDay = ref(null);
    const now = dayjs();
    const prevMonthDayjs = computed(() => {
      return date.value.subtract(1, "month");
    });
    const curMonthDatePrefix = computed(() => {
      return dayjs(date.value).format("YYYY-MM");
    });
    const nextMonthDayjs = computed(() => {
      return date.value.add(1, "month");
    });
    const i18nDate = computed(() => {
      const pickedMonth = `el.datepicker.month${date.value.format("M")}`;
      return `${date.value.year()} ${t("el.datepicker.year")} ${t(pickedMonth)}`;
    });
    const realSelectedDay = computed({
      get() {
        if (!props.modelValue)
          return selectedDay.value;
        return date.value;
      },
      set(val) {
        selectedDay.value = val;
        const result = val.toDate();
        ctx.emit("input", result);
        ctx.emit("update:modelValue", result);
      }
    });
    const date = computed(() => {
      if (!props.modelValue) {
        if (realSelectedDay.value) {
          return realSelectedDay.value;
        } else if (validatedRange.value.length) {
          return validatedRange.value[0][0];
        }
        return now;
      } else {
        return dayjs(props.modelValue);
      }
    });
    const validatedRange = computed(() => {
      if (!props.range)
        return [];
      const rangeArrDayjs = props.range.map((_) => dayjs(_));
      const [startDayjs, endDayjs] = rangeArrDayjs;
      if (startDayjs.isAfter(endDayjs)) {
        console.warn("[ElementCalendar]end time should be greater than start time");
        return [];
      }
      if (startDayjs.isSame(endDayjs, "month")) {
        return [[
          startDayjs.startOf("week"),
          endDayjs.endOf("week")
        ]];
      } else {
        if (startDayjs.add(1, "month").month() !== endDayjs.month()) {
          console.warn("[ElementCalendar]start time and end time interval must not exceed two months");
          return [];
        }
        const endMonthFirstDay = endDayjs.startOf("month");
        const endMonthFirstWeekDay = endMonthFirstDay.startOf("week");
        let endMonthStart = endMonthFirstDay;
        if (!endMonthFirstDay.isSame(endMonthFirstWeekDay, "month")) {
          endMonthStart = endMonthFirstDay.endOf("week").add(1, "day");
        }
        return [
          [
            startDayjs.startOf("week"),
            startDayjs.endOf("month")
          ],
          [
            endMonthStart,
            endDayjs.endOf("week")
          ]
        ];
      }
    });
    const pickDay = (day) => {
      realSelectedDay.value = day;
    };
    const selectDate = (type) => {
      let day;
      if (type === "prev-month") {
        day = prevMonthDayjs.value;
      } else if (type === "next-month") {
        day = nextMonthDayjs.value;
      } else {
        day = now;
      }
      if (day.isSame(date.value, "day"))
        return;
      pickDay(day);
    };
    return {
      selectedDay,
      curMonthDatePrefix,
      i18nDate,
      realSelectedDay,
      date,
      validatedRange,
      pickDay,
      selectDate,
      t
    };
  }
});

const _hoisted_1$1 = { class: "el-calendar" };
const _hoisted_2$1 = { class: "el-calendar__header" };
const _hoisted_3 = { class: "el-calendar__title" };
const _hoisted_4 = {
  key: 0,
  class: "el-calendar__button-group"
};
const _hoisted_5 = {
  key: 0,
  class: "el-calendar__body"
};
const _hoisted_6 = {
  key: 1,
  class: "el-calendar__body"
};
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_button = resolveComponent("el-button");
  const _component_el_button_group = resolveComponent("el-button-group");
  const _component_date_table = resolveComponent("date-table");
  return openBlock(), createBlock("div", _hoisted_1$1, [
    createVNode("div", _hoisted_2$1, [
      createVNode("div", _hoisted_3, toDisplayString(_ctx.i18nDate), 1),
      _ctx.validatedRange.length === 0 ? (openBlock(), createBlock("div", _hoisted_4, [
        createVNode(_component_el_button_group, null, {
          default: withCtx(() => [
            createVNode(_component_el_button, {
              size: "mini",
              onClick: _cache[1] || (_cache[1] = ($event) => _ctx.selectDate("prev-month"))
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(_ctx.t("el.datepicker.prevMonth")), 1)
              ]),
              _: 1
            }),
            createVNode(_component_el_button, {
              size: "mini",
              onClick: _cache[2] || (_cache[2] = ($event) => _ctx.selectDate("today"))
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(_ctx.t("el.datepicker.today")), 1)
              ]),
              _: 1
            }),
            createVNode(_component_el_button, {
              size: "mini",
              onClick: _cache[3] || (_cache[3] = ($event) => _ctx.selectDate("next-month"))
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(_ctx.t("el.datepicker.nextMonth")), 1)
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ])) : createCommentVNode("v-if", true)
    ]),
    _ctx.validatedRange.length === 0 ? (openBlock(), createBlock("div", _hoisted_5, [
      createVNode(_component_date_table, {
        date: _ctx.date,
        "selected-day": _ctx.realSelectedDay,
        onPick: _ctx.pickDay
      }, createSlots({ _: 2 }, [
        _ctx.$slots.dateCell ? {
          name: "dateCell",
          fn: withCtx((data) => [
            renderSlot(_ctx.$slots, "dateCell", data)
          ])
        } : void 0
      ]), 1032, ["date", "selected-day", "onPick"])
    ])) : (openBlock(), createBlock("div", _hoisted_6, [
      (openBlock(true), createBlock(Fragment, null, renderList(_ctx.validatedRange, (range_, index) => {
        return openBlock(), createBlock(_component_date_table, {
          key: index,
          date: range_[0],
          "selected-day": _ctx.realSelectedDay,
          range: range_,
          "hide-header": index !== 0,
          onPick: _ctx.pickDay
        }, createSlots({ _: 2 }, [
          _ctx.$slots.dateCell ? {
            name: "dateCell",
            fn: withCtx((data) => [
              renderSlot(_ctx.$slots, "dateCell", data)
            ])
          } : void 0
        ]), 1032, ["date", "selected-day", "range", "hide-header", "onPick"]);
      }), 128))
    ]))
  ]);
}

script$1.render = render$1;
script$1.__file = "packages/calendar/src/index.vue";

script$1.install = (app) => {
  app.component(script$1.name, script$1);
};
const _Calendar = script$1;

export default _Calendar;
