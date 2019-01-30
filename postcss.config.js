/**
 *   ======请留意这里的语法======
 */

/**           1px圆角边框（可能存在一些误差问题）
 *   ===语法===
 *      border-color: red;
 *     _border-radius: 10px;
 *   ===备注===
 *     1. 如果不需要转化，不加下划线即可
 *     2. 默认1px所以只需要赋予border-color属性即可
 *     3. 暂时只支持四个圆角相同大小
 */

/**           1px直角边框
 *   ===语法===
 *     _border[-top|-bottom|-left|-right]: 1px solid [颜色];
 *     多于一条边可以这样写 _border-top-bottom-left: ....
 *   ===备注===
 *     1. 如果不需要转化，不加下划线即可
 *     2. 如果存在border-radius属性，则不生效
 *     3. 同一条规则中存在多条该语法，只有最后一条生效
 */

/**           使用雪碧图（小图片+rem依然会有误差问题）
 *   ===语法===
 *     源代码 ↓
 *         width: 42px;
 *         height: 44px;
 *         background: url('./img/vueDemo-hot1.sp@2x.png');
 *     编译后代码 ↓
 *         width: 42px;
 *         height: 44px;
 *         background-image: url(//localhost:666/static/img/sprite.sprite.png);
 *         background-position: -84px 0px;
 *         background-size: 126px 44px;
 *   ===备注===
 *     1. 下载@2x的两倍图，并根据设计稿定好元素宽高
 *     2. 需要转换的图片命名规范：xxxx.sp@2x.png
 *     3. 可参考文档：https://github.com/2createStudio/postcss-sprites
 */

/**           px直接转换成rem
 *   ===语法===
 *     源代码 ==> [属性名]: 75px;
 *     编译后代码 ==> [属性名]: 1rem;
 *   ===备注===
 *     1. 如果不需要转化，px使用大写PX
 *     2. 1px默认不进行转换
 *     3. 如需对某些类名或属性做特殊处理，请阅读文档修改下面的对应配置：https://github.com/cuth/postcss-pxtorem
 *     (or ask lfx)
 */

/**           autoprefixer自动处理浏览器前缀
 *   ===语法===
 *     源代码 ==> transform: translate(1px, 1px);
 *     编译后代码 ==> -webkit-transform: translateY(1px, 1px);
 *                       -ms-transform: translateY(1px, 1px);
 *                           transform: translateY(1px, 1px);
 *   ===备注===
 *     1. 建议原来的写法@include prefix(...)直接改用此写法
 *     2. 可参考文档：https://github.com/postcss/autoprefixer
 */

// const borderRadius = require("./postcss-plugins/border-radius");
// const border1px = require("./postcss-plugins/border-1-px");
// const sprites = require("postcss-sprites");
const pxtorem = require("postcss-pxtorem");
const autoprefixer = require("autoprefixer");

module.exports = {
    plugins: [
        // borderRadius(),
        // border1px(),
        // sprites({
        //     // stylesheetPath: '',
        //     spritePath: "./sprites", // 雪碧图输出路径（开发环境也会生成）
        //     retina: true, // 是否支持retina屏幕
        //     spritesmith: {
        //         padding: 5,
        //         // algorithm: 'top-down',
        //         engines: 'canvassmith',
        //     },
        //     groupBy(image) {
        //         // 组成雪碧图组规则
        //         // console.log(image.path)
        //         if (/\\srcvue\\pages/.test(image.path)) {
        //             let groups = /\\srcvue\\pages\\(.*?)\\(.*?)\\img\\.*/.exec(
        //                 image.path
        //             );
        //             let groupName = groups ? `${groups[1]}-${groups[2]}` : "common";
        //             return Promise.resolve(groupName);
        //         } else if (/\\srcvue\\assets/.test(image.path)) {
        //             return Promise.resolve("assets");
        //         } else if (/\\srcvue\\components/.test(image.path)) {
        //             return Promise.resolve("components");
        //         } else {
        //             return Promise.resolve("common");
        //         }
        //     },
        //     filterBy: function (image) {
        //         // 过滤器
        //         // console.log(image.url)
        //         if (/.+\.sp\@2x\.png/.test(image.url)) {
        //             return Promise.resolve();
        //         }
        //         return Promise.reject();
        //     }
        // }),
        pxtorem({
            rootValue: 75,
            unitPrecision: 5, // rem小数位
            propList: ["*"], // 需要转化的属性
            selectorBlackList: [/^body$/, /^figure$/, /^fieldset$/], // 类名黑名单
            replace: true,
            mediaQuery: false, // 允许在媒体查询中转化px
            minPixelValue: 2 // 需要转化的最小px值
        }),
        autoprefixer({
            browsers: ["last 20 versions", "Android >= 4.0"]
        })
    ]
};