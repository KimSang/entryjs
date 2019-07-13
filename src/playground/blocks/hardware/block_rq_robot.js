'use strict';

Entry.RQ = {
    DC_MOTOR_MAP: {
        RQ_PORT_MOVE_DC : 'A',
        RQ_PORT_SET_DC : 'B',
        RQ_PORT_STOP : 'C',
    },
    SAM3_MOTOR_MAP : {
        RQ_PORT_MOVE_SAM3 : 'D',
        RQ_PORT_MOVE_SAM3_POS : 'E',
        RQ_PORT_SAM3_LED : 'F',
        RQ_PORT_SAM3_MAN : 'G',
        RQ_PORT_GET_SAM3_POS_READ : 'HR',
        RQ_PORT_CON_SAM3_POS : 'H1',
    },
    SENSOR_MAP : {
        RQ_PORT_SOUND_SENSOR : 'I',
        RQ_PORT_REMOTE_CONTROL : 'J',
        RQ_PORT_INFRARED_SENSOR_1 : 'K1',
        RQ_PORT_INFRARED_SENSOR_2 : 'K2',
        RQ_PORT_TOUCH_SENSOR_1 : 'L1',
        RQ_PORT_TOUCH_SENSOR_2 : 'L2',
    },
    SOUND_MAP : {
        RQ_PORT_PLAY_SOUND : 'M',
        RQ_PORT_PLAY_SOUND_SEC : 'N',
        RQ_PORT_STOP_SOUND : 'O',
    },
    LED_MAP : {
        RQ_PORT_LED_COLOR : 'P',
        RQ_PORT_OFF_LED : 'Q',
    },
    MOTION_MAP : {
        RQ_PORT_MOTION : 'R',
    },

    deviceTypes : {
        RQ_Touch_1: 1,
        RQ_Touch_2: 2,
        RQ_Remote: 3,
        RQ_Sound: 4,
        RQ_Inf_1: 5,
        RQ_Inf_2: 6,
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
        'rq_cmd_con_sam3_motor_position' : 10,
        'rq_cmd_sound_sensor' : 11,
        'rq_cmd_remote_control' : 12,
        'rq_cmd_infrared_ray_sensor' : 13,
        'rq_cmd_touch_sensor' : 14,
        'rq_cmd_play_sound' : 15,
        'rq_cmd_play_sound_second' : 16,
        'rq_cmd_stop_sound' : 17,
        'rq_cmd_on_led' : 18,
        'rq_cmd_off_led' : 19,
        'rq_cmd_motion' : 20,
    },

    time_sleep(delay){
        var start = new Date().getTime();
        while (new Date().getTime() < start + delay);
    },

    setZero() {

        Object.values(Entry.RQ.DC_MOTOR_MAP).forEach(function(port) {
            Entry.hw.sendQueue[port] = 0;
        });
        
        Object.values(Entry.RQ.SAM3_MOTOR_MAP).forEach(function(port) {
            Entry.hw.sendQueue[port] = 0;
        });

        Object.values(Entry.RQ.LED_MAP).forEach(function(port) {
            Entry.hw.sendQueue[port] = 0;
        });
        Object.values(Entry.RQ.MOTION_MAP).forEach(function(port) {
            Entry.hw.sendQueue[port] = 0;
        });

        Entry.hw.sendQueue[Entry.RQ.DC_MOTOR_MAP.RQ_PORT_SET_DC] = {
            cmd: Entry.RQ.COMMAND_MAP.rq_cmd_set_dc_motor_position,
            left_wheel : 0,
            right_wheel : 0,
        };

        Entry.hw.sendQueue[Entry.RQ.MOTION_MAP.RQ_PORT_MOTION] = {
            cmd : Entry.RQ.COMMAND_MAP.rq_cmd_motion,
            motion : 0,
        };

        Entry.hw.sendQueue[Entry.RQ.SOUND_MAP.RQ_PORT_STOP_SOUND] = {
            cmd : Entry.RQ.COMMAND_MAP.rq_cmd_stop_sound,
            stop : 1
        };
        
        Entry.hw.update();

        Object.values(Entry.RQ.SOUND_MAP).forEach(function(port) {
            Entry.hw.sendQueue[port] = 0;
        });

        Object.values(Entry.RQ.DC_MOTOR_MAP).forEach(function(port) {
            Entry.hw.sendQueue[port] = 0;
        });
    
    },
    id: '31.1',
    name: 'RQ',
    url: 'https://www.robobuilder.co.kr/',
    imageName: 'rq_robot.png',
    title: {
        ko: 'RQ 로봇',
        en: 'RQ Robot',
    },
};

Entry.RQ.setLanguage = function() {
    return {
        ko: {
            template: {
                rq_move_dc_motor: '회전모터 %1의 회전방향은 %2, 속도는 %3',
                rq_set_dc_motor_position: '왼쪽 바퀴 %1 오른쪽 바퀴 %2 (으)로 정하기',
                rq_stop_dc_motor: '모터 정지',

                rq_move_sam3_motor: '서보 모터 %1의 속도는 %2',
                rq_set_sam3_motor_position: '서보 모터 %1의 위치값 %2',
                rq_on_sam3_led: '서보 모터 %1의 LED 켜기',
                rq_off_sam3_led: '서보 모터 %1의 LED 끄기',
                rq_move_sam3_motor_manual: '서보모터 %1 수동 동작',
                rq_get_sam3_motor_position: '서보모터 %1의 위치값',
                rq_con_sam3_motor_position : '서보모터 %1의 위치 확정',

                rq_sound_sensor: '소리센서',
                rq_remote_value: '리모콘값',
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

                rq_move_sam3_motor: '서보 모터 %1의 속도는 %2',
                rq_set_sam3_motor_position: '서보 모터 %1의 위치값 %2',
                rq_on_sam3_led: '서보 모터 %1의 LED 켜기',
                rq_off_sam3_led: '서보 모터 %1의 LED 끄기',
                rq_move_sam3_motor_manual: '서보모터 %1 수동 동작',
                rq_get_sam3_motor_position: '서보모터 %1의 위치값',
                rq_con_sam3_motor_position : '서보모터 %1의 위치 확정',

                rq_sound_sensor: '소리센서',
                rq_remote_value: '리모콘값',
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

Entry.RQ.blockMenuBlocks = [
    'rq_move_dc_motor',
    'rq_set_dc_motor_position',
    'rq_stop_dc_motor',

    'rq_move_sam3_motor',
    'rq_set_sam3_motor_position',
    'rq_on_sam3_led',
    'rq_off_sam3_led',
    'rq_move_sam3_motor_manual',
    'rq_get_sam3_motor_position',
    'rq_con_sam3_motor_position',

    'rq_sound_sensor',
    'rq_remote_value',
    'rq_infrared_ray_sensor',
    'rq_touch_sensor',

    'rq_play_sound',
    'rq_play_sound_second',
    'rq_stop_sound',

    'rq_on_led',
    'rq_off_led',

    'rq_motion',
];
Entry.RQ.getBlocks = function() {
    return {
        rq_move_dc_motor: {
            color: EntryStatic.colorSet.block.default.HARDWARE,
            outerLine: EntryStatic.colorSet.block.darken.HARDWARE,
            skeleton: 'basic',
            statements: [],
            params: [
                {
                    type: 'Dropdown',
                    options: [['LEFT', '29'], ['RIGHT', '30']],
                    value: '29',
                    fontSize: 11,
                    bgColor: EntryStatic.colorSet.block.darken.HARDWARE,
                },
                {
                    type: 'Dropdown',
                    options: [['CW', '4'], ['CCW', '3']],
                    value: '4',
                    fontSize: 11,
                    bgColor: EntryStatic.colorSet.block.darken.HARDWARE,
                },
                {
                    type: 'Block',
                    accept: 'string',
                    defaultType: 'number',
                },
                {
                    type: 'Indicator',
                    img: 'block_icon/hardware_icon.svg',
                    size: 12,
                },
            ],
            events: {},
            def: {
                params: [
                    null, 
                    null, {
                    type:"number",
                    params : ["0"]
                }],
                type: 'rq_move_dc_motor',
            },
            paramsKeyMap: {
                MOTOR: 0,
                DIRECTION: 1,
                SPEED : 2,
            },
            class: 'rq_motor',
            isNotFor: ['RQ'],
            func(sprite, script) {

                var motor = script.getStringField('MOTOR', script);
                var direction = script.getStringField('DIRECTION', script);
                var speed = script.getValue('SPEED', script);
                if( speed <= 0)
                {
                    speed = 0;
                }
                else if( speed >= 3)
                {
                    speed = 3;
                }
                Entry.hw.sendQueue[Entry.RQ.DC_MOTOR_MAP.RQ_PORT_MOVE_DC] = {
                    cmd : Entry.RQ.COMMAND_MAP.rq_cmd_move_dc_motor,
                    motor : motor,
                    direction : direction,
                    speed : speed,
                };
                
                return script.callReturn();
            },
        },

        rq_set_dc_motor_position: {
            color: EntryStatic.colorSet.block.default.HARDWARE,
            outerLine: EntryStatic.colorSet.block.darken.HARDWARE,
            skeleton: 'basic',
            statements: [],
            params: [
                {
                    type: 'Block',
                    accept: 'string',
                    defaultType: 'number',
                },
                {
                    type: 'Block',
                    accept: 'string',
                    defaultType: 'number',
                },
                {
                    type: 'Indicator',
                    img: 'block_icon/hardware_icon.svg',
                    size: 12,
                },
            ],
            events: {},
            def: {
                params: [
                    {
                        type:"number",
                        params : ["0"]
                    },
                    {
                        type:"number",
                        params : ["0"]
                    }
                ],
                type: 'rq_set_dc_motor_position',
            },
            paramsKeyMap: {
                LEFT_WHEEL_POS: 0,
                RIGHT_WHEEL_POS: 1,
            },
            class: 'rq_motor',
            isNotFor: ['RQ'],
            func(sprite, script) {
                
                var left_wheel_pos = script.getValue('LEFT_WHEEL_POS', script);
                var right_wheel_pos = script.getValue('RIGHT_WHEEL_POS', script);

                if( left_wheel_pos <= -3)
                {
                    left_wheel_pos = -3;
                }
                else if( left_wheel_pos >= 3)
                {
                    left_wheel_pos = 3;
                }

                if( right_wheel_pos <= -3)
                {
                    right_wheel_pos = -3;
                }
                else if( right_wheel_pos >= 3)
                {
                    right_wheel_pos = 3;
                }

                Entry.hw.sendQueue[Entry.RQ.DC_MOTOR_MAP.RQ_PORT_SET_DC] = {
                    cmd: Entry.RQ.COMMAND_MAP.rq_cmd_set_dc_motor_position,
                    left_wheel : left_wheel_pos,
                    right_wheel : right_wheel_pos,
                };

                return script.callReturn();
            },
        },

        rq_stop_dc_motor: {
            color: EntryStatic.colorSet.block.default.HARDWARE,
            outerLine: EntryStatic.colorSet.block.darken.HARDWARE,
            fontColor: '#fff',
            skeleton: 'basic',
            statements: [],
            events: {},
            def: {
                type: 'rq_stop_dc_motor',
            },
            params : [
                {
                    type: 'Indicator',
                    img: 'block_icon/hardware_icon.svg',
                    size: 12,
                },
            ],
            paramsKeyMap: {
                PORT: 0,
            },
            class: 'rq_motor',
            isNotFor: ['RQ'],
            func(sprite, script) {

                Entry.hw.sendQueue[Entry.RQ.DC_MOTOR_MAP.RQ_PORT_STOP] = {
                    cmd : Entry.RQ.COMMAND_MAP.rq_cmd_stop_dc_motor,
                    stop : 1,
                };

                return script.callReturn();
            },
        },

        rq_move_sam3_motor: {
            color: EntryStatic.colorSet.block.default.HARDWARE,
            outerLine: EntryStatic.colorSet.block.darken.HARDWARE,
            skeleton: 'basic',
            statements: [],
            params: [
                {
                    type: 'Block',
                    accept: 'string',
                    defaultType: 'number',
                },
                {
                    type: 'Block',
                    accept: 'string',
                    defaultType: 'number',
                },
                {
                    type: 'Indicator',
                    img: 'block_icon/hardware_icon.svg',
                    size: 12,
                },
            ],
            events: {},
            def: {
                params: [
                    {
                        type:"number",
                        params : ["0"]
                    },
                    {
                        type:"number",
                        params : ["0"]
                    }
                    ],
                type: 'rq_move_sam3_motor',
            },
            paramsKeyMap: {
                SAM3_MOTOR: 0,
                SPEED : 1,
            },
            class: 'rq_sam3_motor',
            isNotFor: ['RQ'],
            func(sprite, script) {
                var sam3_motor = script.getValue('SAM3_MOTOR', script);
                var direction = 0;
                var speed = script.getValue('SPEED', script);

                if( speed <= -5)
                {
                    speed = -5;
                }
                else if( speed >= 5)
                {
                    speed = 5;
                }

                if( sam3_motor <= 0)
                {
                    sam3_motor = 0;
                }
                else if( sam3_motor >= 28)
                {
                    sam3_motor = 28;
                }

                if( speed <= 0)
                {
                    direction = 3;
                }
                else{
                    direction = 4;
                }

                Entry.hw.sendQueue[Entry.RQ.SAM3_MOTOR_MAP.RQ_PORT_MOVE_SAM3] = {
                    cmd : Entry.RQ.COMMAND_MAP.rq_cmd_move_sam3_motor,
                    motor : sam3_motor,
                    direction : direction,
                    speed : Math.abs(speed),
                };

                return script.callReturn();
            },
        },

        rq_set_sam3_motor_position: {
            color: EntryStatic.colorSet.block.default.HARDWARE,
            outerLine: EntryStatic.colorSet.block.darken.HARDWARE,
            skeleton: 'basic',
            statements: [],
            params: [
                {
                    type: 'Block',
                    accept: 'string',
                    defaultType: 'number',
                },
                {
                    type: 'Block',
                    accept: 'string',
                    defaultType: 'number',
                },
                {
                    type: 'Indicator',
                    img: 'block_icon/hardware_icon.svg',
                    size: 12,
                },
            ],
            events: {},
            def: {
                params: [                   
                {
                    type:"number",
                    params : ["0"]
                },
                {
                    type:"number",
                    params : ["0"]
                }
            ],
                type: 'rq_set_sam3_motor_position',
            },
            paramsKeyMap: {
                SAM3_MOTOR: 0,
                POSITION: 1,
            },
            class: 'rq_sam3_motor',
            isNotFor: ['RQ'],
            func(sprite, script) {
                var sam3_motor = script.getValue('SAM3_MOTOR', script);
                var position = script.getValue('POSITION', script);

                if( position <= 0)
                {
                    position = 0;
                }
                else if( position >= 255)
                {
                    position = 255;
                }
                if( sam3_motor <= 0)
                {
                    sam3_motor = 0;
                }
                else if( sam3_motor >= 28)
                {
                    sam3_motor = 28;
                }
                
                Entry.hw.sendQueue[Entry.RQ.SAM3_MOTOR_MAP.RQ_PORT_MOVE_SAM3_POS] = {
                    cmd : Entry.RQ.COMMAND_MAP.rq_cmd_set_sam3_motor_position,
                    motor : sam3_motor,
                    position : position,
                };

                return script.callReturn();
            },
        },

        rq_on_sam3_led: {
            color: EntryStatic.colorSet.block.default.HARDWARE,
            outerLine: EntryStatic.colorSet.block.darken.HARDWARE,
            skeleton: 'basic',
            statements: [],
            params: [
                {
                    type: 'Block',
                    accept: 'string',
                    defaultType: 'number',
                },
                {
                    type: 'Indicator',
                    img: 'block_icon/hardware_icon.svg',
                    size: 12,
                },
            ],
            events: {},
            def: {
                params: [{
                    type:"number",
                    params :["0"]
                }],
                type: 'rq_on_sam3_led',
            },
            paramsKeyMap: {
                SAM3_MOTOR: 0,
            },
            class: 'rq_sam3_motor',
            isNotFor: ['RQ'],
            func(sprite, script) {
                var sam3_motor = script.getValue('SAM3_MOTOR', script);
                
                if( sam3_motor <= 0)
                {
                    sam3_motor = 0;
                }
                else if( sam3_motor >= 28)
                {
                    sam3_motor = 28;
                }

                Entry.hw.sendQueue[Entry.RQ.SAM3_MOTOR_MAP.RQ_PORT_SAM3_LED] = {
                    cmd : Entry.RQ.COMMAND_MAP.rq_cmd_on_sam3_led,
                    motor : sam3_motor,
                };

                return script.callReturn();
            },
        },

        rq_off_sam3_led: {
            color: EntryStatic.colorSet.block.default.HARDWARE,
            outerLine: EntryStatic.colorSet.block.darken.HARDWARE,
            skeleton: 'basic',
            statements: [],
            params: [
                {
                    type: 'Block',
                    accept: 'string',
                    defaultType: 'number',
                },
                {
                    type: 'Indicator',
                    img: 'block_icon/hardware_icon.svg',
                    size: 12,
                },
            ],
            events: {},
            def: {
                params: [
                    {
                        type : "number",
                        params : ["0"],
                    }
                ],
                type: 'rq_off_sam3_led',
            },
            paramsKeyMap: {
                SAM3_MOTOR: 0,
            },
            class: 'rq_sam3_motor',
            isNotFor: ['RQ'],
            func(sprite, script) {
                var sam3_motor = script.getValue('SAM3_MOTOR', script);
                
                if( sam3_motor <= 0)
                {
                    sam3_motor = 0;
                }
                else if( sam3_motor >= 28)
                {
                    sam3_motor = 28;
                }

                Entry.hw.sendQueue[Entry.RQ.SAM3_MOTOR_MAP.RQ_PORT_SAM3_LED] = {
                    cmd : Entry.RQ.COMMAND_MAP.rq_cmd_off_sam3_led,
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
                    type: 'Block',
                    accept: 'string',
                    defaultType: 'number',
                },
                {
                    type: 'Indicator',
                    img: 'block_icon/hardware_icon.svg',
                    size: 12,
                },

            ],
            events: {},
            def: {
                params: [{
                    type : "number",
                    params : ["0"],
                }],
                type: 'rq_move_sam3_motor_manual',
            },
            paramsKeyMap: {
                SAM3_MOTOR: 0,
            },
            class: 'rq_sam3_motor',
            isNotFor: ['RQ'],
            func(sprite, script) {
                var sam3_motor = script.getValue('SAM3_MOTOR', script);
                
                if( sam3_motor <= 0)
                {
                    sam3_motor = 0;
                }
                else if( sam3_motor >= 28)
                {
                    sam3_motor = 28;
                }

                Entry.hw.sendQueue[Entry.RQ.SAM3_MOTOR_MAP.RQ_PORT_SAM3_MAN] = {
                    cmd : Entry.RQ.COMMAND_MAP.rq_cmd_move_sam3_motor_manual,
                    motor : sam3_motor,
                };

                return script.callReturn();
            },
        },
        
        rq_get_sam3_motor_position: {
            color: EntryStatic.colorSet.block.default.HARDWARE,
            outerLine: EntryStatic.colorSet.block.darken.HARDWARE,
            skeleton: 'basic_string_field',
            statements: [],
            params: [
                {
                    type: 'Block',
                    accept: 'string',
                    defaultType: 'number',
                },
                {
                    type: 'Indicator',
                    img: 'block_icon/hardware_icon.svg',
                    size: 12,
                },
            ],
            events: {},
            def: {
                params: [{
                    type : "number",
                    params : ["0"],
                }],
                type: 'rq_get_sam3_motor_position',
            },
            paramsKeyMap: {
                SAM3_MOTOR : 0,
            },
            class: 'rq_sam3_motor',
            isNotFor: ['RQ'],
            func(sprite, script) {
                var sam3_motor = script.getValue('SAM3_MOTOR', script);
                var result;
                var sevo_pos = 0;
                
                if( sam3_motor <= 0)
                {
                    sam3_motor = 0;
                }
                else if( sam3_motor >= 28)
                {
                    sam3_motor = 28;
                }
                
                result = Entry.hw.portData[Entry.RQ.SAM3_MOTOR_MAP.RQ_PORT_GET_SAM3_POS_READ];
                if(result !== undefined )
                {
                    if( result.motor == sam3_motor)
                    {
                        sevo_pos = result.value;
                    }
                }
                else{
                    sevo_pos = 0;
                }

                return sevo_pos;

            },
        },

        rq_con_sam3_motor_position: {
            color: EntryStatic.colorSet.block.default.HARDWARE,
            outerLine: EntryStatic.colorSet.block.darken.HARDWARE,
            skeleton: 'basic',
            statements: [],
            params: [
                {
                    type: 'Block',
                    accept: 'string',
                    defaultType: 'number',
                },
                {
                    type: 'Indicator',
                    img: 'block_icon/hardware_icon.svg',
                    size: 12,
                },
            ],
            events: {},
            def: {
                params: [{
                    type : "number",
                    params : ["0"],
                }],
                type: 'rq_con_sam3_motor_position',
            },
            paramsKeyMap: {
                SAM3_MOTOR : 0,
            },
            class: 'rq_sam3_motor',
            isNotFor: ['RQ'],
            func(sprite, script) {
                var sam3_motor = script.getValue('SAM3_MOTOR', script);
                
                if( sam3_motor <= 0)
                {
                    sam3_motor = 0;
                }
                else if( sam3_motor >= 28)
                {
                    sam3_motor = 28;
                }

                Entry.hw.sendQueue[Entry.RQ.SAM3_MOTOR_MAP.RQ_PORT_CON_SAM3_POS] = {
                    cmd : Entry.RQ.COMMAND_MAP.rq_cmd_con_sam3_motor_position,
                    motor : sam3_motor,
                };

                return script.callReturn();
            },
        },
     
        rq_sound_sensor: {
            color: EntryStatic.colorSet.block.default.HARDWARE,
            outerLine: EntryStatic.colorSet.block.darken.HARDWARE,
            fontColor: '#fff',
            skeleton: 'basic_string_field',
            statements: [],
            events: {},
            def: {
                type: 'rq_sound_sensor',
            },
            paramsKeyMap: {
                PORT: 0,
            },
            class: 'rq_sensor',
            isNotFor: ['RQ'],
            func(sprite, script) {
                var result = Entry.hw.portData[Entry.RQ.SENSOR_MAP.RQ_PORT_SOUND_SENSOR];
                var sound_value = 0;

                if( result != undefined)
                {
                    if(result.type == Entry.RQ.deviceTypes.RQ_Sound)
                    {
                        sound_value = result.value;
                    }
                }

                return sound_value;
            },
        },

        rq_remote_value: {
            color: EntryStatic.colorSet.block.default.HARDWARE,
            outerLine: EntryStatic.colorSet.block.darken.HARDWARE,
            fontColor: '#fff',
            skeleton: 'basic_string_field',
            statements: [],
            events: {},
            def: {
                type: 'rq_remote_value',
            },
            paramsKeyMap: {
                PORT: 0,
            },
            class: 'rq_sensor',
            isNotFor: ['RQ'],
            func(sprite, script) {
                var result = Entry.hw.portData[Entry.RQ.SENSOR_MAP.RQ_PORT_REMOTE_CONTROL];
                return result;
            },
        },

        rq_infrared_ray_sensor: {
            color: EntryStatic.colorSet.block.default.HARDWARE,
            outerLine: EntryStatic.colorSet.block.darken.HARDWARE,
            fontColor: '#fff',
            skeleton: 'basic_string_field',
            statements: [],
            params: [
                {
                    type: 'Dropdown',
                    options: [['1', '1'], ['2', '3']],
                    value: '1',
                    fontSize: 11,
                    bgColor: EntryStatic.colorSet.block.darken.HARDWARE,
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
            isNotFor: ['RQ'],
            func(sprite, script) {
                
                var port = script.getStringField('INF_SENSOR', script);
                var result = 0;
                var inf_value = 0;

                if( port == '1')
                {
                    result = Entry.hw.portData[Entry.RQ.SENSOR_MAP.RQ_PORT_INFRARED_SENSOR_1];
                    if( result.type == Entry.RQ.deviceTypes.RQ_Inf_1)
                    {
                        inf_value = result.value;
                    }
                }
                else if(port == '3')
                {
                    result = Entry.hw.portData[Entry.RQ.SENSOR_MAP.RQ_PORT_INFRARED_SENSOR_2];
                    if( result.type == Entry.RQ.deviceTypes.RQ_Inf_2)
                    {
                        inf_value = result.value;
                    }
                }

                return inf_value;
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
                    options: [['1', '0'], ['2', '2']],
                    value: '0',
                    fontSize: 11,
                    bgColor: EntryStatic.colorSet.block.darken.HARDWARE,
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
            isNotFor: ['RQ'],
            func(sprite, script) {
                
                var port = script.getStringField('TOUCH_SENSOR', script);
                var result;
                var touch_value = 0;

                if( port == '0')
                {
                    result = Entry.hw.portData[Entry.RQ.SENSOR_MAP.RQ_PORT_TOUCH_SENSOR_1];
                    if(result.type == Entry.RQ.deviceTypes.RQ_Touch_1)
                    {
                        touch_value = (result.value == 0)?false:true;
                    }
                }
                else if(port == '2')
                {
                    result = Entry.hw.portData[Entry.RQ.SENSOR_MAP.RQ_PORT_TOUCH_SENSOR_2];
                    if(result.type == Entry.RQ.deviceTypes.RQ_Touch_2)
                    {
                        touch_value = (result.value == 0)?false:true;
                    }
                }

                return touch_value;
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
                type: 'rq_play_sound',
            },
            paramsKeyMap: {
                PLAY_LIST: 0,
            },
            class: 'rq_sound',
            isNotFor: ['RQ'],
            func(sprite, script) {
                var play_list = script.getStringField('PLAY_LIST', script);

                Entry.hw.sendQueue[Entry.RQ.SOUND_MAP.RQ_PORT_PLAY_SOUND] = {
                    cmd : Entry.RQ.COMMAND_MAP.rq_cmd_play_sound,
                    play_list : play_list,
                };

                return script.callReturn();
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
                    value: '14',
                    fontSize: 11,
                    bgColor: EntryStatic.colorSet.block.darken.HARDWARE,
                },
                {
                    type: 'Block',
                    accept: 'string',
                    defaultType: 'number',
                },
                {
                    type: 'Indicator',
                    img: 'block_icon/hardware_icon.svg',
                    size: 12,
                },
            ],
            events: {},
            def: {
                params: [null,
                {
                    type : "number",
                    params : ["0"],
                }],
                type: 'rq_play_sound_second',
            },
            paramsKeyMap: {
                PLAY_LIST : 0,
                SEC : 1,
            },
            class: 'rq_sound',
            isNotFor: ['RQ'],
            func(sprite, script) {
                var play_list = script.getStringField('PLAY_LIST', script);
                var sec = script.getValue('SEC', script);

                if( sec >= 10)
                {
                    sec = 10;
                }

                Entry.hw.sendQueue[Entry.RQ.SOUND_MAP.RQ_PORT_PLAY_SOUND_SEC] = {
                    cmd : Entry.RQ.COMMAND_MAP.rq_cmd_play_sound_second,
                    play_list : play_list,
                    sec : sec,
                };

                Entry.hw.update();

                Entry.RQ.time_sleep(sec * 1000);

                Entry.hw.sendQueue[Entry.RQ.SOUND_MAP.RQ_PORT_STOP_SOUND] = {
                    cmd : Entry.RQ.COMMAND_MAP.rq_cmd_stop_sound,
                    stop : 1
                };

                return script.callReturn();
            },
        },

        rq_stop_sound: {
            color: EntryStatic.colorSet.block.default.HARDWARE,
            outerLine: EntryStatic.colorSet.block.darken.HARDWARE,
            fontColor: '#fff',
            skeleton: 'basic',
            statements: [],
            events: {},
            def: {
                type: 'rq_stop_sound',
            },
            params : [
                {
                    type: 'Indicator',
                    img: 'block_icon/hardware_icon.svg',
                    size: 12,
                },
            ],
            paramsKeyMap: {
                PORT: 0,
            },
            class: 'rq_sound',
            isNotFor: ['RQ'],
            func(sprite, script) {

                Entry.hw.sendQueue[Entry.RQ.SOUND_MAP.RQ_PORT_STOP_SOUND] = {
                    cmd : Entry.RQ.COMMAND_MAP.rq_cmd_stop_sound,
                    stop : 1
                };

                return script.callReturn();
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
                    options: [['1', '29'], ['2', '30']],
                    value: '29',
                    fontSize: 11,
                    bgColor: EntryStatic.colorSet.block.darken.HARDWARE,
                },

                {
                    type: 'Dropdown',
                    options: [
                        ['BLUE', '1'],
                        ['RED', '2'],
                        ['REDBLUE', '3'],
                        ['OFF', '0'],
                    ],
                    value: '1',
                    fontSize: 11,
                    bgColor: EntryStatic.colorSet.block.darken.HARDWARE,
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
                type: 'rq_on_led',
            },
            paramsKeyMap: {
                LED : 0,
                COLOR: 1,
            },
            class: 'rq_output',
            isNotFor: ['RQ'],
            func(sprite, script) {
                var led = script.getStringField('LED', script);
                var color = script.getStringField('COLOR', script);

                Entry.hw.sendQueue[Entry.RQ.LED_MAP.RQ_PORT_LED_COLOR] = {
                    cmd : Entry.RQ.COMMAND_MAP.rq_cmd_on_led,
                    led : led,
                    color : color,
                };

                return script.callReturn();
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
                    options: [['1', '29'], ['2', '30']],
                    value: '29',
                    fontSize: 11,
                    bgColor: EntryStatic.colorSet.block.darken.HARDWARE,
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
                type: 'rq_off_led',
            },
            paramsKeyMap: {
                LED : 0,
            },
            class: 'rq_output',
            isNotFor: ['RQ'],
            func(sprite, script) {
                var led = script.getStringField('LED', script);

                Entry.hw.sendQueue[Entry.RQ.LED_MAP.RQ_PORT_OFF_LED] = {
                    cmd : Entry.RQ.COMMAND_MAP.rq_cmd_off_led,
                    led : led,
                };

                return script.callReturn();
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
                type: 'rq_motion',
            },
            paramsKeyMap: {
                MOTION : 0,
            },
            class: 'rq_motion',
            isNotFor: ['RQ'],
            func(sprite, script) {
                var motion = script.getStringField('MOTION', script);

                Entry.hw.sendQueue[Entry.RQ.MOTION_MAP.RQ_PORT_MOTION] = {
                    cmd : Entry.RQ.COMMAND_MAP.rq_cmd_motion,
                    motion : motion,
                };

                return script.callReturn();
            },
        },
    };
};

module.exports = Entry.RQ;
