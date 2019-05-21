'use strict';

Entry.rq_robot = {
    PORT_MAP: {
        RQ_PORT_MOVE_DC : 'A',
        RQ_PORT_SET_DC : 'B',
        RQ_PORT_STOP : 'C',
        RQ_PORT_MOVE_SAM3 : 'D',
        RQ_PORT_MOVE_SAM3_POS : 'E',
        RQ_PORT_SAM3_LED : 'F',
        RQ_PORT_SAM3_MAN : 'G',
        RQ_PORT_GET_SAM3_POS : 'H',
    },

    COMMAND_MAP : {
        'rq_cmd_move_dc_motor' : 1,
        'rq_cmd_set_dc_motor_position' : 2,
        'rq_cmd_stop_dc_motor' : 3,
        'rq_cmd_move_sam3_motor' : 4,
        'rq_cmd_set_sam3_motor_position' : 5,
        'rq_cmd_on_sam3_led' : 6,
        'rq_cmd_off_sam3_led' : 7,
        'rq_cmd_move_sam3_motor_manual' : 8,
        'rq_cmd_get_sam3_motor_position' : 9,
        'rq_cmd_sound_sensor' : 10,
        'rq_cmd_infrared_ray_sensor' : 11,
        'rq_cmd_touch_sensor' : 12,
        'rq_cmd_play_sound' : 13,
        'rq_cmd_play_sound_second' : 14,
        'rq_cmd_stop_sound' : 15,
        'rq_cmd_on_led' : 16,
        'rq_cmd_off_led' : 17,
        'rq_cmd_motion' : 18,
    },

    removeTimeout(id) {
        clearTimeout(id);
        var timeouts = this.timeouts;
        var index = timeouts.indexOf(id);
        if (index >= 0) {
            timeouts.splice(index, 1);
        }
    },
    removeAllTimeouts() {
        var timeouts = this.timeouts;
        for (var i in timeouts) {
            clearTimeout(timeouts[i]);
        }
        this.timeouts = [];
    },
    setZero() {

        Entry.hw.sendQueue.readablePorts = [];
        for (var port = 0; port < 20; port++) {
            Entry.hw.sendQueue[port] = 0;
            Entry.hw.sendQueue.readablePorts.push(port);
        }
        Entry.hw.update();
     
    },
    id: 'FFFF',
    name: 'rq_robot',
    url: 'https://www.robobuilder.co.kr/',
    imageName: 'rq_robot.png',
    title: {
        ko: 'RQ 로봇',
        en: 'rq_robot',
    },
};

Entry.rq_robot.setLanguage = function() {
    return {
        ko: {
            template: {
                rq_move_dc_motor: '회전모터 %1의 회전방향은 %2, 속도는 %3',
                rq_set_dc_motor_position: '왼쪽 바퀴 %1 오른쪽 바퀴 %2 (으)로 정하기',
                rq_stop_dc_motor: '모터 정지',

                rq_move_sam3_motor: '서보 모터 %1의 회전 방향은 %2, 속도는 %3',
                rq_set_sam3_motor_position: '서보 모터 %1의 위치값 %2',
                rq_on_sam3_led: '서보 모터 %1의 LED 켜기',
                rq_off_sam3_led: '서보 모터 %1의 LED 끄기',
                rq_move_sam3_motor_manual: '서보모터 %1 수동 동작',
                rq_get_sam3_motor_position: '서보모터 %1의 위치값',

                rq_sound_sensor: '소리센서',
                rq_infrared_ray_sensor: '%1번 적외선 센서',
                rq_touch_sensor: '%1번 터치 센서',

                rq_play_sound: '%1 소리 출력',
                rq_play_sound_second: '%1(으)로 %2초 연주하기',
                rq_stop_sound: '소리 끄기',

                rq_on_led: 'LED %1의 %2 켜기',
                rq_off_led: 'LED %1 끄기',

                rq_motion: '동작 호출 %1',
            },
        },
        en: {
            template: {
                rq_move_dc_motor: '회전모터 %1의 회전방향은 %2, 속도는 %3',
                rq_set_dc_motor_position: '왼쪽 바퀴 %1 오른쪽 바퀴 %2 (으)로 정하기',
                rq_stop_dc_motor: '모터 정지',

                rq_move_sam3_motor: '서보 모터 %1의 회전 방향은 %2, 속도는 %3',
                rq_set_sam3_motor_position: '서보 모터 %1의 위치값 %2',
                rq_on_sam3_led: '서보 모터 %1의 LED 켜기',
                rq_off_sam3_led: '서보 모터 %1의 LED 끄기',
                rq_move_sam3_motor_manual: '서보모터 %1 수동 동작',
                rq_get_sam3_motor_position: '서보모터 %1의 위치값',

                rq_sound_sensor: '소리센서',
                rq_infrared_ray_sensor: '%1번 적외선 센서',
                rq_touch_sensor: '%1번 터치 센서',

                rq_play_sound: '%1 소리 출력',
                rq_play_sound_second: '%1(으)로 %2초 연주하기',
                rq_stop_sound: '소리 끄기',

                rq_on_led: 'LED %1의 %2 켜기',
                rq_off_led: 'LED %1 끄기',

                rq_motion: '동작 호출 %1',
            },
        },
    };
};

Entry.rq_robot.blockMenuBlocks = [
    'rq_move_dc_motor',
    'rq_set_dc_motor_position',
    'rq_stop_dc_motor',

    'rq_move_sam3_motor',
    'rq_set_sam3_motor_position',
    'rq_on_sam3_led',
    'rq_off_sam3_led',
    'rq_move_sam3_motor_manual',
    'rq_get_sam3_motor_position',

    'rq_sound_sensor',
    'rq_infrared_ray_sensor',
    'rq_touch_sensor',

    'rq_play_sound',
    'rq_play_sound_second',
    'rq_stop_sound',

    'rq_on_led',
    'rq_off_led',

    'rq_motion',
];
Entry.rq_robot.getBlocks = function() {
    return {
        rq_move_dc_motor: {
            color: EntryStatic.colorSet.block.default.HARDWARE,
            outerLine: EntryStatic.colorSet.block.darken.HARDWARE,
            skeleton: 'basic',
            statements: [],
            params: [
                {
                    type: 'Dropdown',
                    options: [['LEFT', 'LEFT'], ['RIGHT', 'RIGHT']],
                    value: 'LEFT',
                    fontSize: 11,
                    bgColor: EntryStatic.colorSet.block.darken.HARDWARE,
                    arrowColor: EntryStatic.colorSet.arrow.default.HARDWARE,
                },
                {
                    type: 'Dropdown',
                    options: [['CW', 'CW'], ['CCW', 'CCW']],
                    value: 'CW',
                    fontSize: 11,
                    bgColor: EntryStatic.colorSet.block.darken.HARDWARE,
                    arrowColor: EntryStatic.colorSet.arrow.default.HARDWARE,
                },
                {
                    type: 'Dropdown',
                    options: [
                        ['0', '0'],
                        ['1', '1'],
                        ['2', '2'],
                        ['3', '3'],
                        ['4', '4'],
                        ['5', '5'],
                        ['6', '6'],
                        ['7', '7'],
                        ['8', '8'],
                        ['9', '9'],
                        ['10', '10'],
                        ['11', '11'],
                        ['12', '12'],
                        ['13', '13'],
                        ['14', '14'],
                        ['15', '15'],
                    ],
                    value: '0',
                    fontSize: 11,
                    bgColor: EntryStatic.colorSet.block.darken.HARDWARE,
                    arrowColor: EntryStatic.colorSet.arrow.default.HARDWARE,
                },
                {
                    type: 'Indicator',
                    img: 'block_icon/hardware_icon.svg',
                    size: 12,
                },
            ],
            events: {},
            def: {
                params: [null],
                type: 'rq_move_dc_motor',
            },
            paramsKeyMap: {
                MOTOR: 0,
                DIRECTION: 1,
                SPEED : 2,
            },
            class: 'rq_motor',
            //isNotFor: ['rq_robot'],
            func(sprite, script) {

                var motor = script.getStringField('MOTOR', script);
                var direction = script.getStringField('DIRECTION', script);
                var speed = script.getStringField('SPEED', script);
                Entry.hw.sendQueue[Entry.rq_robot.PORT_MAP.RQ_PORT_MOVE_DC] = {
                    cmd : Entry.rq_robot.COMMAND_MAP.rq_cmd_move_dc_motor,
                    motor : motor,
                    direction : direction,
                    speed : speed,
                };
                Entry.hw.update();
                //return script.callReturn();
            },
        },

        rq_set_dc_motor_position: {
            color: EntryStatic.colorSet.block.default.HARDWARE,
            outerLine: EntryStatic.colorSet.block.darken.HARDWARE,
            skeleton: 'basic',
            statements: [],
            params: [
                {
                    type: 'Dropdown',
                    options: [
                        ['-3', '-3'],
                        ['-2', '-2'],
                        ['-1', '-1'],
                        ['0', '0'],
                        ['1', '1'],
                        ['2', '2'],
                        ['3', '3'],
                    ],
                    value: '0',
                    fontSize: 11,
                    bgColor: EntryStatic.colorSet.block.darken.HARDWARE,
                    arrowColor: EntryStatic.colorSet.arrow.default.HARDWARE,
                },
                {
                    type: 'Dropdown',
                    options: [
                        ['-3', '-3'],
                        ['-2', '-2'],
                        ['-1', '-1'],
                        ['0', '0'],
                        ['1', '1'],
                        ['2', '2'],
                        ['3', '3'],
                    ],
                    value: '0',
                    fontSize: 11,
                    bgColor: EntryStatic.colorSet.block.darken.HARDWARE,
                    arrowColor: EntryStatic.colorSet.arrow.default.HARDWARE,
                },
                {
                    type: 'Indicator',
                    img: 'block_icon/hardware_icon.svg',
                    size: 12,
                },
            ],
            events: {},
            def: {
                params: [null],
                type: 'rq_set_dc_motor_position',
            },
            paramsKeyMap: {
                LEFT_WHEEL_POS: 0,
                RIGHT_WHEEL_POS: 1,
            },
            class: 'rq_motor',
            //isNotFor: ['rq_robot'],
            func(sprite, script) {
                
                var left_wheel_pos = script.getStringField('LEFT_WHEEL_POS', script);
                var right_wheel_pos = script.getStringField('RIGHT_WHEEL_POS', script);

                Entry.hw.sendQueue[Entry.rq_robot.PORT_MAP.RQ_PORT_SET_DC] = {
                    cmd: Entry.rq_robot.COMMAND_MAP.rq_cmd_set_dc_motor_position,
                    left_wheel : left_wheel_pos,
                    right_wheel : right_wheel_pos,
                };
                Entry.hw.update();
                //return script.callReturn();
            },
        },

        rq_stop_dc_motor: {
            color: EntryStatic.colorSet.block.default.HARDWARE,
            outerLine: EntryStatic.colorSet.block.darken.HARDWARE,
            fontColor: '#fff',
            skeleton: 'basic_string_field',
            statements: [],
            events: {},
            def: {
                type: 'rq_stop_dc_motor',
            },
            paramsKeyMap: {
                PORT: 0,
            },
            class: 'rq_motor',
            //isNotFor: ['rq_robot'],
            func(sprite, script) {

                Entry.hw.sendQueue[Entry.rq_robot.PORT_MAP.RQ_PORT_STOP] = {
                    cmd : Entry.rq_robot.COMMAND_MAP.rq_cmd_stop_dc_motor,
                };
                Entry.hw.update();
                //return script.callReturn();
            },
        },

        rq_move_sam3_motor: {
            color: EntryStatic.colorSet.block.default.HARDWARE,
            outerLine: EntryStatic.colorSet.block.darken.HARDWARE,
            skeleton: 'basic',
            statements: [],
            params: [
                {
                    type: 'Dropdown',
                    options: [
                        ['0', '0'],
                        ['1', '1'],
                        ['2', '2'],
                        ['3', '3'],
                        ['4', '4'],
                        ['5', '5'],
                        ['6', '6'],
                        ['7', '7'],
                        ['8', '8'],
                        ['9', '9'],
                        ['10', '10'],
                        ['11', '11'],
                        ['12', '12'],
                        ['13', '13'],
                        ['14', '14'],
                        ['15', '15'],
                        ['16', '16'],
                        ['17', '17'],
                        ['18', '18'],
                        ['19', '19'],
                        ['20', '20'],
                        ['21', '21'],
                        ['22', '22'],
                        ['23', '23'],
                        ['24', '24'],
                        ['25', '25'],
                        ['26', '26'],
                        ['27', '27'],
                        ['28', '28'],
                        ['29', '29'],
                        ['30', '30'],
                    ],
                    value: '0',
                    fontSize: 11,
                    bgColor: EntryStatic.colorSet.block.darken.HARDWARE,
                    arrowColor: EntryStatic.colorSet.arrow.default.HARDWARE,
                },
                {
                    type: 'Dropdown',
                    options: [['CW', 'CW'], ['CCW', 'CCW']],
                    value: 'CW',
                    fontSize: 11,
                    bgColor: EntryStatic.colorSet.block.darken.HARDWARE,
                    arrowColor: EntryStatic.colorSet.arrow.default.HARDWARE,
                },
                {
                    type: 'Dropdown',
                    options: [
                        ['-5', '-5'],
                        ['-4', '-4'],
                        ['-3', '-3'],
                        ['-2', '-2'],
                        ['-1', '-1'],
                        ['0', '0'],
                        ['1', '1'],
                        ['2', '2'],
                        ['3', '3'],
                        ['4', '4'],
                        ['5', '5'],
                    ],
                    value: '0',
                    fontSize: 11,
                    bgColor: EntryStatic.colorSet.block.darken.HARDWARE,
                    arrowColor: EntryStatic.colorSet.arrow.default.HARDWARE,
                },
                {
                    type: 'Indicator',
                    img: 'block_icon/hardware_icon.svg',
                    size: 12,
                },
            ],
            events: {},
            def: {
                params: [null],
                type: 'rq_move_sam3_motor',
            },
            paramsKeyMap: {
                SAM3_MOTOR: 0,
                DIRECTION: 1,
                SPEED : 2,
            },
            class: 'rq_sam3_motor',
            //isNotFor: ['rq_robot'],
            func(sprite, script) {
                var sam3_motor = script.getStringField('SAM3_MOTOR', script);
                var direction = script.getStringField('DIRECTION', script);
                var speed = script.getStringField('SPEED', script);

                Entry.hw.sendQueue[Entry.rq_robot.PORT_MAP.RQ_PORT_MOVE_SAM3] = {
                    cmd : Entry.rq_robot.COMMAND_MAP.rq_cmd_move_sam3_motor,
                    motor : sam3_motor,
                    direction : direction,
                    speed : speed,
                };
                Entry.hw.update();
                //return script.callReturn();
            },
        },

        rq_set_sam3_motor_position: {
            color: EntryStatic.colorSet.block.default.HARDWARE,
            outerLine: EntryStatic.colorSet.block.darken.HARDWARE,
            skeleton: 'basic',
            statements: [],
            params: [
                {
                    type: 'Dropdown',
                    options: [
                        ['0', '0'],
                        ['1', '1'],
                        ['2', '2'],
                        ['3', '3'],
                        ['4', '4'],
                        ['5', '5'],
                        ['6', '6'],
                        ['7', '7'],
                        ['8', '8'],
                        ['9', '9'],
                        ['10', '10'],
                        ['11', '11'],
                        ['12', '12'],
                        ['13', '13'],
                        ['14', '14'],
                        ['15', '15'],
                        ['16', '16'],
                        ['17', '17'],
                        ['18', '18'],
                        ['19', '19'],
                        ['20', '20'],
                        ['21', '21'],
                        ['22', '22'],
                        ['23', '23'],
                        ['24', '24'],
                        ['25', '25'],
                        ['26', '26'],
                        ['27', '27'],
                        ['28', '28'],
                        ['29', '29'],
                        ['30', '30'],
                    ],
                    value: '0',
                    fontSize: 11,
                    bgColor: EntryStatic.colorSet.block.darken.HARDWARE,
                    arrowColor: EntryStatic.colorSet.arrow.default.HARDWARE,
                },
                {
                    type: 'TextInput',
                    value: 0,
                    fontSize: 11,
                    bgColor: EntryStatic.colorSet.block.darken.HARDWARE,
                    arrowColor: EntryStatic.colorSet.arrow.default.HARDWARE,
                },
                {
                    type: 'Indicator',
                    img: 'block_icon/hardware_icon.svg',
                    size: 12,
                },
            ],
            events: {},
            def: {
                params: [null],
                type: 'rq_set_sam3_motor_position',
            },
            paramsKeyMap: {
                SAM3_MOTOR: 0,
                POSITION: 1,
            },
            class: 'rq_sam3_motor',
            //isNotFor: ['rq_robot'],
            func(sprite, script) {
                var sam3_motor = script.getStringField('SAM3_MOTOR', script);
                var position = script.getStringField('POSITION', script);
                
                Entry.hw.sendQueue[Entry.rq_robot.PORT_MAP.RQ_PORT_MOVE_SAM3_POS] = {
                    cmd : Entry.rq_robot.COMMAND_MAP.rq_cmd_set_sam3_motor_position,
                    motor : sam3_motor,
                    position : position,
                };
                Entry.hw.update();
                //return script.callReturn();
            },
        },

        rq_on_sam3_led: {
            color: EntryStatic.colorSet.block.default.HARDWARE,
            outerLine: EntryStatic.colorSet.block.darken.HARDWARE,
            skeleton: 'basic',
            statements: [],
            params: [
                {
                    type: 'Dropdown',
                    options: [
                        ['0', '0'],
                        ['1', '1'],
                        ['2', '2'],
                        ['3', '3'],
                        ['4', '4'],
                        ['5', '5'],
                        ['6', '6'],
                        ['7', '7'],
                        ['8', '8'],
                        ['9', '9'],
                        ['10', '10'],
                        ['11', '11'],
                        ['12', '12'],
                        ['13', '13'],
                        ['14', '14'],
                        ['15', '15'],
                        ['16', '16'],
                        ['17', '17'],
                        ['18', '18'],
                        ['19', '19'],
                        ['20', '20'],
                        ['21', '21'],
                        ['22', '22'],
                        ['23', '23'],
                        ['24', '24'],
                        ['25', '25'],
                        ['26', '26'],
                        ['27', '27'],
                        ['28', '28'],
                        ['29', '29'],
                        ['30', '30'],
                    ],
                    value: '0',
                    fontSize: 11,
                    bgColor: EntryStatic.colorSet.block.darken.HARDWARE,
                    arrowColor: EntryStatic.colorSet.arrow.default.HARDWARE,
                },
                {
                    type: 'Indicator',
                    img: 'block_icon/hardware_icon.svg',
                    size: 12,
                },
            ],
            events: {},
            def: {
                params: [null],
                type: 'rq_on_sam3_led',
            },
            paramsKeyMap: {
                SAM3_MOTOR: 0,
            },
            class: 'rq_sam3_motor',
            //isNotFor: ['rq_robot'],
            func(sprite, script) {
                var sam3_motor = script.getStringField('SAM3_MOTOR', script);
                
                Entry.hw.sendQueue[Entry.rq_robot.PORT_MAP.RQ_PORT_SAM3_LED] = {
                    cmd : Entry.rq_robot.COMMAND_MAP.rq_cmd_on_sam3_led,
                    motor : sam3_motor,
                };
                Entry.hw.update();
                //return script.callReturn();
            },
        },

        rq_off_sam3_led: {
            color: EntryStatic.colorSet.block.default.HARDWARE,
            outerLine: EntryStatic.colorSet.block.darken.HARDWARE,
            skeleton: 'basic',
            statements: [],
            params: [
                {
                    type: 'Dropdown',
                    options: [
                        ['0', '0'],
                        ['1', '1'],
                        ['2', '2'],
                        ['3', '3'],
                        ['4', '4'],
                        ['5', '5'],
                        ['6', '6'],
                        ['7', '7'],
                        ['8', '8'],
                        ['9', '9'],
                        ['10', '10'],
                        ['11', '11'],
                        ['12', '12'],
                        ['13', '13'],
                        ['14', '14'],
                        ['15', '15'],
                        ['16', '16'],
                        ['17', '17'],
                        ['18', '18'],
                        ['19', '19'],
                        ['20', '20'],
                        ['21', '21'],
                        ['22', '22'],
                        ['23', '23'],
                        ['24', '24'],
                        ['25', '25'],
                        ['26', '26'],
                        ['27', '27'],
                        ['28', '28'],
                        ['29', '29'],
                        ['30', '30'],
                    ],
                    value: '0',
                    fontSize: 11,
                    bgColor: EntryStatic.colorSet.block.darken.HARDWARE,
                    arrowColor: EntryStatic.colorSet.arrow.default.HARDWARE,
                },
                {
                    type: 'Indicator',
                    img: 'block_icon/hardware_icon.svg',
                    size: 12,
                },
            ],
            events: {},
            def: {
                params: [null],
                type: 'rq_off_sam3_led',
            },
            paramsKeyMap: {
                SAM3_MOTOR: 0,
            },
            class: 'rq_sam3_motor',
            //isNotFor: ['rq_robot'],
            func(sprite, script) {
                var sam3_motor = script.getStringField('SAM3_MOTOR', script);
                
                Entry.hw.sendQueue[Entry.rq_robot.PORT_MAP.RQ_PORT_SAM3_LED] = {
                    cmd : Entry.rq_robot.COMMAND_MAP.rq_cmd_off_sam3_led,
                    motor : sam3_motor,
                };
                return script.callReturn();
            },
        },

        rq_move_sam3_motor_manual: {
            color: EntryStatic.colorSet.block.default.HARDWARE,
            outerLine: EntryStatic.colorSet.block.darken.HARDWARE,
            skeleton: 'basic',
            statements: [],
            params: [
                {
                    type: 'Dropdown',
                    options: [
                        ['0', '0'],
                        ['1', '1'],
                        ['2', '2'],
                        ['3', '3'],
                        ['4', '4'],
                        ['5', '5'],
                        ['6', '6'],
                        ['7', '7'],
                        ['8', '8'],
                        ['9', '9'],
                        ['10', '10'],
                        ['11', '11'],
                        ['12', '12'],
                        ['13', '13'],
                        ['14', '14'],
                        ['15', '15'],
                        ['16', '16'],
                        ['17', '17'],
                        ['18', '18'],
                        ['19', '19'],
                        ['20', '20'],
                        ['21', '21'],
                        ['22', '22'],
                        ['23', '23'],
                        ['24', '24'],
                        ['25', '25'],
                        ['26', '26'],
                        ['27', '27'],
                        ['28', '28'],
                        ['29', '29'],
                        ['30', '30'],
                    ],
                    value: '0',
                    fontSize: 11,
                    bgColor: EntryStatic.colorSet.block.darken.HARDWARE,
                    arrowColor: EntryStatic.colorSet.arrow.default.HARDWARE,
                },
                {
                    type: 'Indicator',
                    img: 'block_icon/hardware_icon.svg',
                    size: 12,
                },
            ],
            events: {},
            def: {
                params: [null],
                type: 'rq_move_sam3_motor_manual',
            },
            paramsKeyMap: {
                SAM3_MOTOR: 0,
            },
            class: 'rq_sam3_motor',
            //isNotFor: ['rq_robot'],
            func(sprite, script) {
                var sam3_motor = script.getStringField('SAM3_MOTOR', script);
                
                Entry.hw.sendQueue[Entry.rq_robot.PORT_MAP.WRITE] = {
                    cmd : Entry.rq_robot.COMMAND_MAP.rq_cmd_move_sam3_motor_manual,
                    motor : sam3_motor,
                };
                return script.callReturn();
            },
        },

        rq_get_sam3_motor_position: {
            color: EntryStatic.colorSet.block.default.HARDWARE,
            outerLine: EntryStatic.colorSet.block.darken.HARDWARE,
            skeleton: 'basic',
            statements: [],
            params: [
                {
                    type: 'Dropdown',
                    options: [
                        ['0', '0'],
                        ['1', '1'],
                        ['2', '2'],
                        ['3', '3'],
                        ['4', '4'],
                        ['5', '5'],
                        ['6', '6'],
                        ['7', '7'],
                        ['8', '8'],
                        ['9', '9'],
                        ['10', '10'],
                        ['11', '11'],
                        ['12', '12'],
                        ['13', '13'],
                        ['14', '14'],
                        ['15', '15'],
                        ['16', '16'],
                        ['17', '17'],
                        ['18', '18'],
                        ['19', '19'],
                        ['20', '20'],
                        ['21', '21'],
                        ['22', '22'],
                        ['23', '23'],
                        ['24', '24'],
                        ['25', '25'],
                        ['26', '26'],
                        ['27', '27'],
                        ['28', '28'],
                        ['29', '29'],
                        ['30', '30'],
                    ],
                    value: '0',
                    fontSize: 11,
                    bgColor: EntryStatic.colorSet.block.darken.HARDWARE,
                    arrowColor: EntryStatic.colorSet.arrow.default.HARDWARE,
                },
                {
                    type: 'Indicator',
                    img: 'block_icon/hardware_icon.svg',
                    size: 12,
                },
            ],
            events: {},
            def: {
                params: [null],
                type: 'rq_get_sam3_motor_position',
            },
            paramsKeyMap: {
                SAM3_MOTOR : 0,
            },
            class: 'rq_sam3_motor',
            //isNotFor: ['rq_robot'],
            func(sprite, script) {
                var sam3_motor = script.getStringField('SAM3_MOTOR', script);
                
                Entry.hw.sendQueue[Entry.rq_robot.PORT_MAP.RQ_PORT_GET_SAM3_POS] = {
                    cmd : Entry.rq_robot.COMMAND_MAP.rq_cmd_get_sam3_motor_position,
                    motor : sam3_motor,
                };
                return script.callReturn();
            },
        },
     
        rq_sound_sensor: {
            color: EntryStatic.colorSet.block.default.HARDWARE,
            outerLine: EntryStatic.colorSet.block.darken.HARDWARE,
            fontColor: '#fff',
            skeleton: 'basic_boolean_field',
            statements: [],
            events: {},
            def: {
                type: 'rq_sound_sensor',
            },
            paramsKeyMap: {
                PORT: 0,
            },
            class: 'rq_sensor',
            //isNotFor: ['rq_robot'],
            func(sprite, script) {
                var port = script.getStringField('PORT', script);
                var portData = Entry.hw.getDigitalPortValue(script.getNumberField('PORT', script));
                var result;
                if ($.isPlainObject(portData)) {
                    result = portData.siValue || 0;
                }
                return result;
            },
        },

        rq_infrared_ray_sensor: {
            color: EntryStatic.colorSet.block.default.HARDWARE,
            outerLine: EntryStatic.colorSet.block.darken.HARDWARE,
            fontColor: '#fff',
            skeleton: 'basic_boolean_field',
            statements: [],
            params: [
                {
                    type: 'Dropdown',
                    options: [['1', '1'], ['2', '2']],
                    value: '1',
                    fontSize: 11,
                    bgColor: EntryStatic.colorSet.block.darken.HARDWARE,
                    arrowColor: EntryStatic.colorSet.arrow.default.HARDWARE,
                },
            ],
            events: {},
            def: {
                params: [null],
                type: 'rq_infrared_ray_sensor',
            },
            paramsKeyMap: {
                INF_SENSOR: 0,
            },
            class: 'rq_sensor',
            //isNotFor: ['rq_robot'],
            func(sprite, script) {
                var port = script.getStringField('PORT', script);
                var portData = Entry.hw.getDigitalPortValue(script.getNumberField('PORT', script));
                var result;
                if ($.isPlainObject(portData)) {
                    result = portData.siValue || 0;
                }
                return result;
            },
        },

        rq_touch_sensor: {
            color: EntryStatic.colorSet.block.default.HARDWARE,
            outerLine: EntryStatic.colorSet.block.darken.HARDWARE,
            fontColor: '#fff',
            skeleton: 'basic_boolean_field',
            statements: [],
            params: [
                {
                    type: 'Dropdown',
                    options: [['1', '1'], ['2', '2']],
                    value: '1',
                    fontSize: 11,
                    bgColor: EntryStatic.colorSet.block.darken.HARDWARE,
                    arrowColor: EntryStatic.colorSet.arrow.default.HARDWARE,
                },
            ],
            events: {},
            def: {
                params: [null],
                type: 'rq_touch_sensor',
            },
            paramsKeyMap: {
                TOUCH_SENSOR: 0,
            },
            class: 'rq_sensor',
            //isNotFor: ['rq_robot'],
            func(sprite, script) {
                var port = script.getStringField('PORT', script);
                var portData = Entry.hw.getDigitalPortValue(script.getNumberField('PORT', script));
                var result;
                if ($.isPlainObject(portData)) {
                    result = portData.siValue || 0;
                }
                return result;
            },
        },

        rq_play_sound: {
            color: EntryStatic.colorSet.block.default.HARDWARE,
            outerLine: EntryStatic.colorSet.block.darken.HARDWARE,
            fontColor: '#fff',
            skeleton: 'basic',
            statements: [],
            params: [
                {
                    type: 'Dropdown',
                    options: [
                        ['Ten little Indian boys', '1'],
                        ['Are you sleeping', '2'],
                        ['Twinkle, Twinkle, Little Star', '3'],
                        ['Head, shoulders, knees and toes', '4'],
                        ['Fur Elise', '5'],
                        ['Minuet(Bach)', '6'],
                        ['Congratulation', '7'],
                        ['Happy birthday', '8'],
                        ['Arirang', '9'],
                        ['(fast)Congratulation', '10'],
                        ['Ending Song', '11'],
                        ['Ding Dong', '12'],
                        ['Ddang', '13'],
                        ['Do', '14'],
                        ['Re', '15'],
                        ['Mi', '16'],
                        ['Fa', '17'],
                        ['Sol', '18'],
                        ['La', '19'],
                        ['Si', '20'],
                        ['Do(H)', '21'],
                        ['Re(H)', '22'],
                        ['Mi(H)', '23'],
                        ['Fa(H)', '24'],
                    ],
                    value: '1',
                    fontSize: 11,
                    bgColor: EntryStatic.colorSet.block.darken.HARDWARE,
                    arrowColor: EntryStatic.colorSet.arrow.default.HARDWARE,
                },
            ],
            events: {},
            def: {
                params: [null],
                type: 'rq_play_sound',
            },
            paramsKeyMap: {
                PLAY_LIST: 0,
            },
            class: 'rq_sound',
            //isNotFor: ['rq_robot'],
            func(sprite, script) {
                Entry.hw.sendQueue.STATUS_COLOR = script.getStringField('COLOR', script);
            },
        },

        rq_play_sound_second: {
            color: EntryStatic.colorSet.block.default.HARDWARE,
            outerLine: EntryStatic.colorSet.block.darken.HARDWARE,
            fontColor: '#fff',
            skeleton: 'basic',
            statements: [],
            params: [
                {
                    type: 'Dropdown',
                    options: [
                        ['Ten little Indian boys', '1'],
                        ['Are you sleeping', '2'],
                        ['Twinkle, Twinkle, Little Star', '3'],
                        ['Head, shoulders, knees and toes', '4'],
                        ['Fur Elise', '5'],
                        ['Minuet(Bach)', '6'],
                        ['Congratulation', '7'],
                        ['Happy birthday', '8'],
                        ['Arirang', '9'],
                        ['(fast)Congratulation', '10'],
                        ['Ending Song', '11'],
                        ['Ding Dong', '12'],
                        ['Ddang', '13'],
                        ['Do', '14'],
                        ['Re', '15'],
                        ['Mi', '16'],
                        ['Fa', '17'],
                        ['Sol', '18'],
                        ['La', '19'],
                        ['Si', '20'],
                        ['Do(H)', '21'],
                        ['Re(H)', '22'],
                        ['Mi(H)', '23'],
                        ['Fa(H)', '24'],
                    ],
                    value: '1',
                    fontSize: 11,
                    bgColor: EntryStatic.colorSet.block.darken.HARDWARE,
                    arrowColor: EntryStatic.colorSet.arrow.default.HARDWARE,
                },
                {
                    type: 'TextInput',
                    value: 0,
                    fontSize: 11,
                    bgColor: EntryStatic.colorSet.block.darken.HARDWARE,
                    arrowColor: EntryStatic.colorSet.arrow.default.HARDWARE,
                },
            ],
            events: {},
            def: {
                params: [null],
                type: 'rq_play_sound_second',
            },
            paramsKeyMap: {
                PLAY_LIST : 0,
                SEC : 1,
            },
            class: 'rq_sound',
            //isNotFor: ['rq_robot'],
            func(sprite, script) {
                Entry.hw.sendQueue.STATUS_COLOR = script.getStringField('COLOR', script);
            },
        },

        rq_on_led: {
            color: EntryStatic.colorSet.block.default.HARDWARE,
            outerLine: EntryStatic.colorSet.block.darken.HARDWARE,
            fontColor: '#fff',
            skeleton: 'basic',
            statements: [],
            params: [
                {
                    type: 'Dropdown',
                    options: [['1', '1'], ['2', '2']],
                    value: '1',
                    fontSize: 11,
                    bgColor: EntryStatic.colorSet.block.darken.HARDWARE,
                    arrowColor: EntryStatic.colorSet.arrow.default.HARDWARE,
                },

                {
                    type: 'Dropdown',
                    options: [
                        ['BLUE', 'BLUE'],
                        ['RED', 'RED'],
                        ['REDBLUE', 'RED_BLUE'],
                        ['OFF', 'OFF'],
                    ],
                    value: 'BLUE',
                    fontSize: 11,
                    bgColor: EntryStatic.colorSet.block.darken.HARDWARE,
                    arrowColor: EntryStatic.colorSet.arrow.default.HARDWARE,
                },
            ],
            events: {},
            def: {
                params: [null],
                type: 'rq_on_led',
            },
            paramsKeyMap: {
                LED : 0,
                COLOR: 1,
            },
            class: 'rq_output',
            //isNotFor: ['rq_robot'],
            func(sprite, script) {
                Entry.hw.sendQueue.STATUS_COLOR = script.getStringField('COLOR', script);
            },
        },

        rq_off_led: {
            color: EntryStatic.colorSet.block.default.HARDWARE,
            outerLine: EntryStatic.colorSet.block.darken.HARDWARE,
            fontColor: '#fff',
            skeleton: 'basic',
            statements: [],
            params: [
                {
                    type: 'Dropdown',
                    options: [['1', '1'], ['2', '2']],
                    value: '1',
                    fontSize: 11,
                    bgColor: EntryStatic.colorSet.block.darken.HARDWARE,
                    arrowColor: EntryStatic.colorSet.arrow.default.HARDWARE,
                },
            ],
            events: {},
            def: {
                params: [null],
                type: 'rq_off_led',
            },
            paramsKeyMap: {
                LED : 0,
            },
            class: 'rq_output',
            //isNotFor: ['rq_robot'],
            func(sprite, script) {
                Entry.hw.sendQueue.STATUS_COLOR = script.getStringField('COLOR', script);
            },
        },

        rq_motion: {
            color: EntryStatic.colorSet.block.default.HARDWARE,
            outerLine: EntryStatic.colorSet.block.darken.HARDWARE,
            fontColor: '#fff',
            skeleton: 'basic',
            statements: [],
            params: [
                {
                    type: 'Dropdown',
                    options: [
                        ['button A', '1'],
                        ['button B', '2'],
                        ['button ↙', '3'],
                        ['button ↑', '4'],
                        ['button ↘', '5'],
                        ['button ←', '6'],
                        ['button □', '7'],
                        ['button →', '8'],
                        ['button L.hand', '9'],
                        ['button ↓', '10'],
                        ['button R.hand', '11'],
                        ['button 1', '12'],
                        ['button 2', '13'],
                        ['button 3', '14'],
                        ['button 4', '15'],
                        ['button 5', '16'],
                        ['button 6', '17'],
                        ['button 7', '18'],
                        ['button 8', '19'],
                        ['button 9', '20'],
                        ['button 0', '21'],
                        ['button *+A', '22'],
                        ['button *+B', '23'],
                        ['button *+↙', '24'],
                        ['button *+↑', '25'],
                        ['button *+↘', '26'],
                        ['button *+←', '27'],
                        ['button *+□', '28'],
                        ['button *+→', '29'],
                        ['button *+L.hand', '30'],
                        ['button *+↓', '31'],
                        ['button *+R.hand', '32'],
                        ['button *+1', '33'],
                        ['button *+2', '34'],
                        ['button *+3', '35'],
                        ['button *+4', '36'],
                        ['button *+5', '37'],
                        ['button *+6', '38'],
                        ['button *+7', '39'],
                        ['button *+8', '40'],
                        ['button *+9', '41'],
                        ['button *+0', '42'],
                    ],
                    value: '1',
                    fontSize: 11,
                    bgColor: EntryStatic.colorSet.block.darken.HARDWARE,
                    arrowColor: EntryStatic.colorSet.arrow.default.HARDWARE,
                },
            ],
            events: {},
            def: {
                params: [null],
                type: 'rq_motion',
            },
            paramsKeyMap: {
                MOTION : 0,
            },
            class: 'rq_motion',
            //isNotFor: ['rq_robot'],
            func(sprite, script) {
                Entry.hw.sendQueue.STATUS_COLOR = script.getStringField('COLOR', script);
            },
        },
    };
};

module.exports = Entry.rq_robot;
