import 'dart:async';

import 'package:audioplayers/audioplayers.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';

void main() async {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'title',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        useMaterial3: true,
      ),
      home: MetronomePage(),
    );
  }
}

class MetronomePage extends StatefulWidget {
  @override
  _MetronomePageState createState() => _MetronomePageState();
}

class _MetronomePageState extends State<MetronomePage> {
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
  }

  // 开始节拍器：取消旧定时器并启动新定时器
  void startMetronome() {
    stopMetronome();
    setState(() {
      isPlaying = true;
    });
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
          'title'.tr(),
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                'BPM: ${bpm.toInt()}',
                style: const TextStyle(fontSize: 32),
              ),
              const SizedBox(height: 20),
              Slider(
                value: bpm,
                min: 40,
                max: 208,
                divisions: 168,
                label: bpm.toInt().toString(),
                onChanged: onBpmChanged,
              ),
              const SizedBox(height: 40),
              ElevatedButton(
                onPressed: isPlaying ? stopMetronome : startMetronome,
                child: Text(isPlaying ? '停止' : '开始'),
                style: ElevatedButton.styleFrom(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 40, vertical: 20),
                  textStyle: const TextStyle(fontSize: 20),
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
