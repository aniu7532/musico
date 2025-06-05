import 'dart:async';

import 'package:audioplayers/audioplayers.dart';
import 'package:beat/l10n/gen_l10n/app_localizations.dart';
import 'package:flutter/material.dart';

class MetronomePage extends StatefulWidget {
  @override
  _MetronomePageState createState() => _MetronomePageState();
}

class _MetronomePageState extends State<MetronomePage>
    with TickerProviderStateMixin {
  late AnimationController _progressController;
  late Animation<double> _progressAnimation;

  final player = AudioPlayer();
  final source = AssetSource('sound/metronome0-1.wav');
  double bpm = 60; // 初始 BPM
  Timer? timer;
  bool isPlaying = false;

  @override
  void initState() {
    super.initState();
    // 预加载音效资源
    player.setSource(source);

    _initProgressAnimation();
  }

  void _initProgressAnimation() {
    final intervalMs = (60000 / bpm).round();
    _progressController = AnimationController(
      vsync: this,
      duration: Duration(milliseconds: intervalMs),
    );
    _progressAnimation =
        Tween<double>(begin: 0.0, end: 1.0).animate(_progressController)
          ..addStatusListener((status) {
            if (status == AnimationStatus.completed && isPlaying) {
              // 每拍结束时播放声音
              player.play(source, mode: PlayerMode.mediaPlayer);
              // 重置并继续下一拍动画
              _progressController.reset();
              _progressController.forward();
            }
          });
  }

  // 开始节拍器：取消旧定时器并启动新定时器
  void startMetronome() {
    stopMetronome();
    setState(() {
      isPlaying = true;
    });

    _progressController.forward(from: 0.0);
    scheduleTick();
  }

  // 根据当前 bpm 计算每一拍的间隔，设置定时器播放节拍音效
  void scheduleTick() {
    final duration = Duration(milliseconds: (60000 / bpm).round());

    timer = Timer(duration, () {
      // 播放音效
      player.play(source, mode: PlayerMode.mediaPlayer);

      // 若节拍器仍在运行，重新调度下一拍
      if (isPlaying) {
        scheduleTick();
      }
    });
  }

  // 停止节拍器
  void stopMetronome() {
    timer?.cancel();
    _progressController.stop();
    setState(() {
      isPlaying = false;
    });
  }

  // 当 BPM 调整时更新状态，如果正在运行则重新调度定时器
  void onBpmChanged(double newBpm) {
    setState(() {
      bpm = newBpm;
    });

    if (isPlaying) {
      timer?.cancel();
      scheduleTick();
      _progressController.stop();
      _initProgressAnimation();
      _progressController.forward();
    } else {
      _initProgressAnimation();
    }
  }

  @override
  void dispose() {
    timer?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          AppLocalizations.of(context).title1,
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Expanded(
                child: AnimatedBuilder(
                  animation: _progressAnimation,
                  builder: (_, __) {
                    return Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        SizedBox(
                          width: 100,
                          height: 10,
                          child: Transform.rotate(
                            angle: -0.75,
                            child: LinearProgressIndicator(
                              value: _progressAnimation.value >= 0.5
                                  ? 1
                                  : _progressAnimation.value * 2,
                            ),
                          ),
                        ),
                        const SizedBox(width: 20),
                        SizedBox(
                          width: 100,
                          height: 10,
                          child: Transform.rotate(
                            angle: 0.75,
                            child: LinearProgressIndicator(
                              // 第二个进度条可使用 value == 1 - firstValue 来实现错拍效果
                              value: _progressAnimation.value >= 0.5
                                  ? (_progressAnimation.value - 0.5) * 2
                                  : 0,
                            ),
                          ),
                        ),
                      ],
                    );
                  },
                ),
              ),
              Text(
                'BPM: ${bpm.toInt()}',
                style: const TextStyle(fontSize: 32),
              ),
              const SizedBox(height: 20),
              Slider(
                value: bpm,
                min: 20,
                max: 208,
                divisions: 168,
                label: bpm.toInt().toString(),
                onChanged: onBpmChanged,
              ),
              const SizedBox(height: 40),
              ElevatedButton(
                onPressed: isPlaying ? stopMetronome : startMetronome,
                style: ElevatedButton.styleFrom(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 40, vertical: 20),
                  textStyle: const TextStyle(fontSize: 20),
                ),
                child: Text(isPlaying
                    ? AppLocalizations.of(context).stop
                    : AppLocalizations.of(context).start),
              )
            ],
          ),
        ),
      ),
    );
  }
}
