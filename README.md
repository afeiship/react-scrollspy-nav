# react-scrollspy-nav
> React scrollspy nav component.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
yarn add @jswork/react-scrollspy-nav
```

## usage
  ```js
  import ReactScrollspyNav, { ScrollspyTemplate } from '@jswork/react-scrollspy-nav';
  import '@jswork/react-scrollspy-nav/dist/style.scss';
  import cx from 'classnames';
  import React, { useState } from 'react';

  // @title: Tailwind classes used predict
  // @description: DO NOT DELETE THIS COMMENT
  // @enums: 'text-red-500'

  function App() {
    const items = ['Home', 'About', 'Services', 'Contact'];
    const [useRoot, setUseRoot] = useState(true);
    const containerRef = React.useRef<HTMLDivElement>(null);

    const template: ScrollspyTemplate = ({ item, index, active }, cb) => {
      return (
        <div
          className={cx({ 'btn-secondary': active }, 'btn btn-sm text-xl')}
          key={index}
          onClick={cb}>
          {item}
        </div>
      );
    };

    return (
      <div
        className={cx('m-10 p-6 shadow bg-gray-100 text-gray-80', {
          'h-[600px] overflow-y-auto': useRoot,
        })}
        ref={containerRef}>
        <div className="badge badge-warning absolute right-0 top-0 m-4">Build Time: {BUILD_TIME}</div>
        <label htmlFor="">
          <span>UseRoot: {useRoot}</span>
          <input type="checkbox" checked={useRoot} onChange={(e) => setUseRoot(e.target.checked)} />
        </label>
        <h1>react-scrollspy-nav</h1>
        <ReactScrollspyNav
          data-root={useRoot}
          containerRef={useRoot ? containerRef : undefined}
          items={items}
          template={template}
          className={cx('wp-8 p-5 mx-auto max-w-[600px] bg-slate-200')}
          navClassName="navbar bg-base-100 sticky top-2 z-10 gap-2 rounded-md shadow-md">
          <ul>
            <h3 className="text-red-600" data-spy-id="home" id="home">
              Home
            </h3>
            <div className="p-4 bg-white rounded-md">
              <li>
                菩提本无树，明镜亦非台，本来无一物，何处惹尘埃。空灵的境界，不染世俗，不受困于贪念囹圄。一份真情，种在心田，汲取日月精华，沐浴甘甜雨露，根深叶茂，葱茏浓郁。历经岁月沧桑，风虐霜寒，一年又一年，收了又收，几度轮回，滤掉了浅薄，滤掉了浮华，滤掉了嗔痴，滤掉了怨恨，滤掉了冷漠，剩下的大概就是慈悲了吧！轻如云，重如山，浅如白，深如黑，柔如水，坚如石，如天对地，雨露对花朵，无声无息，无私无欲。电影《致我们终将逝去的青春》
                里郑微在结尾说过这样一句话：“爱一个人应该像爱祖国，爱山川，爱河流……”咋一听，觉得够矫情，细想锥心不已。爱就是爱了，一个人的事，无关他人，无需回应，无需复返，正如山川的静默不语，河流的奔流不息。需要经过多少沉淀，才会有如此厚重绵延的感悟？有即是无，无即是有，有无之间，一切在心。
              </li>
              <li>
                一花一叶一菩提，一人一心一世界，红尘滚滚，波涌云翳，有人追求乘风破浪，叱咤风云，翻手是云，复手是雨；有人向往仗剑天涯，闲云野鹤，红尘客栈，只为一份豪情逸致，自在逍遥；有人喜欢鲜花簇拥，觥筹交错；有人喜欢清茶一杯，邀月对饮
                。人各有志， 各有所好，不做褒贬评价。
              </li>
              <li>
                不站在道德制高点去审视自己和别人，世界是充满哲学的，没有绝对的对错是非，中国古代圣贤孔夫子提出的中庸之道可以让我们变得智慧，平和，寬宥，坦然，恬淡，圆润，内敛。著名作家王小波在一篇文章中写到：“有些人认为，人应该充满境界高尚的思想，去掉格调低下的思想。这种说法听上去美妙，却使我感到莫大的恐慌。因为高尚的思想和低下的思想的总和就是我自己;倘若去掉一部分，我是谁就成了问题。
                ”或许，让自己变得更真实，更有智慧才是我们应该去努力的方向， 让自己客观的存在，
                不刻意去迎合那些所谓高尚境界思想的人云亦云，不做乌合之众，保持真我，接纳缺憾，包容和尊重不完美，正如赫拉克利特所言：善与恶为一，正如上坡和下坡是同一条路。
              </li>
              <li>
                一切量力而行，不好高骛远，不盲目崇拜，守住初衷，遁着心的方向前行。牡丹雍容华贵，玫瑰艳丽明媚，百合纯洁高雅，罂粟高傲冷艳……每一种花都拥有各自独特的美，每个人都有其美好的棱面，只要热爱生命，热爱生活，就会绽放各自独特的魅力。不要太在乎别人眼里的自己是什么样子，事实上，把你真正看在眼里，放在心上的人没几个。你是在阳春白雪里浪漫开怀，还是在水深火热中遭受煎熬，对旁人来说都不重要，而真正在乎你的人，他唯一的希望就是你开心快乐，带着一份美好且行且珍惜！得意的时候，好像拥有整个世界，世界也拥你入怀，有朝一日，你会发现，你的离开并没有让这个世界有任何改变。正所谓“雁渡寒潭，雁过而潭不留影。风吹疏竹，风过而竹不留声。”
              </li>
              <li>
                人生就是一场修行，
                宋代禅宗大师青原行思提出参禅的三重境界：参禅之初，看山是山，看水是水；禅有悟时，看山不是山，看水不是水；禅中彻悟，看山仍然山，看水仍然是水。佛家讲究入世与出世，于尘世间理会佛理。经历过世事繁杂的磨砺，通过不断的思考和感悟，你终归会明白
                “人本是人，不必刻意去做人；世本是世，无须精心去处世”
                。目无杂物，心无芜杂，返璞归真，回归静谧，朴素简约，不执念，不违心，一切随心随性随缘，来去得失间，不喜形于色，澎湃激荡，也不悲伤凄凉，逆流成河。
                让消逝的消逝，让停留的停留，因果自然。
              </li>
            </div>
            <h3 className="text-red-600" data-spy-id="about" id="about">
              About
            </h3>
            <div className="p-4 bg-white rounded-md">
              <li>
                携一份美好幽居在禅意里，
                从容淡然，拭去浮华，显露本真，就像是一幅留白水墨山水画，率性自然，意境幽远，没有浓墨重彩的渲染，没有争奇斗艳的热烈，所有的意蕴尽在那简单流畅的点线里缱绻，晕染。
              </li>
              <li>人生，继续；禅意，幽幽。我，在路上。</li>
              <li>
                菩提本无树，明镜亦非台，本来无一物，何处惹尘埃。空灵的境界，不染世俗，不受困于贪念囹圄。一份真情，种在心田，汲取日月精华，沐浴甘甜雨露，根深叶茂，葱茏浓郁。历经岁月沧桑，风虐霜寒，一年又一年，收了又收，几度轮回，滤掉了浅薄，滤掉了浮华，滤掉了嗔痴，滤掉了怨恨，滤掉了冷漠，剩下的大概就是慈悲了吧！轻如云，重如山，浅如白，深如黑，柔如水，坚如石，如天对地，雨露对花朵，无声无息，无私无欲。电影《致我们终将逝去的青春》
                里郑微在结尾说过这样一句话：“爱一个人应该像爱祖国，爱山川，爱河流……”咋一听，觉得够矫情，细想锥心不已。爱就是爱了，一个人的事，无关他人，无需回应，无需复返，正如山川的静默不语，河流的奔流不息。需要经过多少沉淀，才会有如此厚重绵延的感悟？有即是无，无即是有，有无之间，一切在心。
              </li>
              <li>
                一花一叶一菩提，一人一心一世界，红尘滚滚，波涌云翳，有人追求乘风破浪，叱咤风云，翻手是云，复手是雨；有人向往仗剑天涯，闲云野鹤，红尘客栈，只为一份豪情逸致，自在逍遥；有人喜欢鲜花簇拥，觥筹交错；有人喜欢清茶一杯，邀月对饮
                。人各有志， 各有所好，不做褒贬评价。
              </li>
              <li>
                不站在道德制高点去审视自己和别人，世界是充满哲学的，没有绝对的对错是非，中国古代圣贤孔夫子提出的中庸之道可以让我们变得智慧，平和，寬宥，坦然，恬淡，圆润，内敛。著名作家王小波在一篇文章中写到：“有些人认为，人应该充满境界高尚的思想，去掉格调低下的思想。这种说法听上去美妙，却使我感到莫大的恐慌。因为高尚的思想和低下的思想的总和就是我自己;倘若去掉一部分，我是谁就成了问题。
                ”或许，让自己变得更真实，更有智慧才是我们应该去努力的方向， 让自己客观的存在，
                不刻意去迎合那些所谓高尚境界思想的人云亦云，不做乌合之众，保持真我，接纳缺憾，包容和尊重不完美，正如赫拉克利特所言：善与恶为一，正如上坡和下坡是同一条路。
              </li>
            </div>
            <h3 className="text-red-600" data-spy-id="services" id="services">
              Services
            </h3>
            <div className="p-4 bg-white rounded-md">
              <li>
                一切量力而行，不好高骛远，不盲目崇拜，守住初衷，遁着心的方向前行。牡丹雍容华贵，玫瑰艳丽明媚，百合纯洁高雅，罂粟高傲冷艳……每一种花都拥有各自独特的美，每个人都有其美好的棱面，只要热爱生命，热爱生活，就会绽放各自独特的魅力。不要太在乎别人眼里的自己是什么样子，事实上，把你真正看在眼里，放在心上的人没几个。你是在阳春白雪里浪漫开怀，还是在水深火热中遭受煎熬，对旁人来说都不重要，而真正在乎你的人，他唯一的希望就是你开心快乐，带着一份美好且行且珍惜！得意的时候，好像拥有整个世界，世界也拥你入怀，有朝一日，你会发现，你的离开并没有让这个世界有任何改变。正所谓“雁渡寒潭，雁过而潭不留影。风吹疏竹，风过而竹不留声。”
              </li>
              <li>
                人生就是一场修行，
                宋代禅宗大师青原行思提出参禅的三重境界：参禅之初，看山是山，看水是水；禅有悟时，看山不是山，看水不是水；禅中彻悟，看山仍然山，看水仍然是水。佛家讲究入世与出世，于尘世间理会佛理。经历过世事繁杂的磨砺，通过不断的思考和感悟，你终归会明白
                “人本是人，不必刻意去做人；世本是世，无须精心去处世”
                。目无杂物，心无芜杂，返璞归真，回归静谧，朴素简约，不执念，不违心，一切随心随性随缘，来去得失间，不喜形于色，澎湃激荡，也不悲伤凄凉，逆流成河。
                让消逝的消逝，让停留的停留，因果自然。
              </li>
              <li>
                携一份美好幽居在禅意里，
                从容淡然，拭去浮华，显露本真，就像是一幅留白水墨山水画，率性自然，意境幽远，没有浓墨重彩的渲染，没有争奇斗艳的热烈，所有的意蕴尽在那简单流畅的点线里缱绻，晕染。
              </li>
              <li>人生，继续；禅意，幽幽。我，在路上。</li>
            </div>
            <h3 className="text-red-600" data-spy-id="contact" id="contact">
              Contact
            </h3>
            <div className="p-4 bg-white rounded-md">
              <li>
                一切量力而行，不好高骛远，不盲目崇拜，守住初衷，遁着心的方向前行。牡丹雍容华贵，玫瑰艳丽明媚，百合纯洁高雅，罂粟高傲冷艳……每一种花都拥有各自独特的美，每个人都有其美好的棱面，只要热爱生命，热爱生活，就会绽放各自独特的魅力。不要太在乎别人眼里的自己是什么样子，事实上，把你真正看在眼里，放在心上的人没几个。你是在阳春白雪里浪漫开怀，还是在水深火热中遭受煎熬，对旁人来说都不重要，而真正在乎你的人，他唯一的希望就是你开心快乐，带着一份美好且行且珍惜！得意的时候，好像拥有整个世界，世界也拥你入怀，有朝一日，你会发现，你的离开并没有让这个世界有任何改变。正所谓“雁渡寒潭，雁过而潭不留影。风吹疏竹，风过而竹不留声。”
              </li>
              <li>
                人生就是一场修行，
                宋代禅宗大师青原行思提出参禅的三重境界：参禅之初，看山是山，看水是水；禅有悟时，看山不是山，看水不是水；禅中彻悟，看山仍然山，看水仍然是水。佛家讲究入世与出世，于尘世间理会佛理。经历过世事繁杂的磨砺，通过不断的思考和感悟，你终归会明白
                “人本是人，不必刻意去做人；世本是世，无须精心去处世”
                。目无杂物，心无芜杂，返璞归真，回归静谧，朴素简约，不执念，不违心，一切随心随性随缘，来去得失间，不喜形于色，澎湃激荡，也不悲伤凄凉，逆流成河。
                让消逝的消逝，让停留的停留，因果自然。
              </li>
              <li>
                携一份美好幽居在禅意里，
                从容淡然，拭去浮华，显露本真，就像是一幅留白水墨山水画，率性自然，意境幽远，没有浓墨重彩的渲染，没有争奇斗艳的热烈，所有的意蕴尽在那简单流畅的点线里缱绻，晕染。
              </li>
              <li>人生，继续；禅意，幽幽。我，在路上。</li>
            </div>
          </ul>
        </ReactScrollspyNav>
      </div>
    );
  }

  export default App;
  ```

## preview
- https://afeiship.github.io/react-scrollspy-nav/

## license
Code released under [the MIT license](https://github.com/afeiship/react-scrollspy-nav/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/react-scrollspy-nav
[version-url]: https://npmjs.org/package/@jswork/react-scrollspy-nav

[license-image]: https://img.shields.io/npm/l/@jswork/react-scrollspy-nav
[license-url]: https://github.com/afeiship/react-scrollspy-nav/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/react-scrollspy-nav
[size-url]: https://github.com/afeiship/react-scrollspy-nav/blob/master/dist/react-scrollspy-nav.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/react-scrollspy-nav
[download-url]: https://www.npmjs.com/package/@jswork/react-scrollspy-nav
