import 'package:audioplayers/audioplayers.dart';
import 'package:beat/l10n/gen_l10n/app_localizations.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class MetronomePage extends StatefulWidget {
  const MetronomePage({super.key});

  @override
  MetronomePageState createState() => MetronomePageState();
}

class MetronomePageState extends State<MetronomePage>
    with TickerProviderStateMixin {
  late AnimationController _progressController;
  late Animation<double> _progressAnimation;

  final player = AudioPlayer(); // 音频播放器
  final source = AssetSource('sound/metronome0-1.wav'); // 音效资源

  double bpm = 60; // 默认 BPM
  bool isPlaying = false;

  @override
  void initState() {
    super.initState();
    _setupPlayer();
    _initProgressAnimation();
  }

  /// 初始化音频播放器，预加载音效并设置播放模式
  Future<void> _setupPlayer() async {
    await player.setSource(source);
    await player.setReleaseMode(ReleaseMode.stop); // 每次播放后自动停止
  }

  /// 初始化动画控制器和动画曲线
  void _initProgressAnimation() {
    final intervalMs = (60000 / bpm).round(); // 每拍的毫秒数

    _progressController = AnimationController(
      vsync: this,
      duration: Duration(milliseconds: intervalMs),
    );

    _progressAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(
        parent: _progressController,
        curve: Curves.easeInOut, // 更平滑的节奏感
      ),
    )..addStatusListener((status) {
        if (status == AnimationStatus.completed && isPlaying) {
          _playTick(); // 播放节拍音效
          _progressController.forward(from: 0.0); // 重启动画
        }
      });
  }

  /// 播放节拍音效
  Future<void> _playTick() async {
    try {
      await player.seek(Duration.zero); // 回到起始位置
      await player.resume(); // 播放
    } catch (e) {
      debugPrint("音效播放失败: $e");
    }
  }

  /// 启动节拍器
  void startMetronome() {
    setState(() {
      isPlaying = true;
    });
    _progressController.forward(from: 0.0);
  }

  /// 停止节拍器
  void stopMetronome() {
    setState(() {
      isPlaying = false;
    });
    _progressController.stop();
  }

  /// BPM 调整逻辑
  void onBpmChanged(double newBpm) {
    if (newBpm == bpm) return;

    setState(() {
      bpm = newBpm;
    });
    // 调用轻微震动（只有在值变化显著时调用一次，避免震动频繁）
    HapticFeedback.heavyImpact();
    // 只更新 AnimationController 的 duration，无需重建
    final newDuration = Duration(milliseconds: (60000 / bpm).round());
    _progressController.duration = newDuration;

    if (isPlaying) {
      _progressController.forward(from: 0.0); // 根据新节奏重启动画
    }
  }

  @override
  void dispose() {
    _progressController.dispose(); // 释放动画控制器
    player.dispose(); // 释放音频资源
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(AppLocalizations.of(context).title1),
      ),
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              // 中间动画进度条
              Expanded(
                child: AnimatedBuilder(
                  animation: _progressAnimation,
                  builder: (_, __) {
                    return Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        // 左侧进度条
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
                        // 右侧进度条（错拍效果）
                        SizedBox(
                          width: 100,
                          height: 10,
                          child: Transform.rotate(
                            angle: 0.75,
                            child: LinearProgressIndicator(
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
              const SizedBox(height: 20),
              // BPM 显示
              Text(
                'BPM: ${bpm.toInt()}',
                style: const TextStyle(fontSize: 32),
              ),
              const SizedBox(height: 20),
              // BPM 滑动条
              Slider(
                value: bpm,
                min: 20,
                max: 208,
                divisions: 188,
                label: bpm.toInt().toString(),
                onChanged: onBpmChanged,
              ),
              const SizedBox(height: 40),
              // 启动/停止按钮
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
