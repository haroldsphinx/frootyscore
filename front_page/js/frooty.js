/**
 * Created by sphinx on 10/8/16.
 */

(function ($) {
    $(init)
    function init() {
// define variables
        var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext('2d');
        var playSound;

        var numbGames = 10;

        var goalSound = function (goal) {
            var gAudio = document.getElementById("audioGoal");

            if (goal == "in") {
                gAudio.src = "sounds/goal2.mp3";

            } else if (goal == "out") {
                gAudio.src = "sounds/missed.mp3";
            }
            gAudio.play();
            var bgAudio = document.getElementById("audioCrowd");
            bgAudio.src = "sounds/crowd2.mp3";
            bgAudio.loop = true;
            bgAudio.play();
        }

        $("button").click(function () {
            if (this.id == "btLeftBottom") {
                startKickOff(-25, 210, 1)
            }
            else if (this.id == "btLeftCentre") {
                startKickOff(-55, 213, 2)
            }
            else if (this.id == "btLeftTop") {
                startKickOff(-90, 213, 3)
            }
            else if (this.id == "btCentreCentre") {
                startKickOff(-40, 345, 4)
            }
            else if (this.id == "btCentreTop") {
                startKickOff(-90, 345, 5)
            }
            else if (this.id == "btRigthBottom") {
                startKickOff(-30, 475, 6)
            }
            else if (this.id == "btRigthCentre") {
                startKickOff(-55, 475, 7)
            }
            else if (this.id == "btRigthTop") {
                startKickOff(-90, 475, 8)
            }
            else if (this.id == "btRestart") {
                restartGame()
            }
        });

        //restart game

        var restartGame = function() {
            $('#plScored').text("");
            $('#p1ResultDiv').text(0);
            $('#p2ResultDiv').text(0);
            $('#counterDiv').text(0);
            $('#plMove').text("Player 1 Turn");
            $("#btRest").hide();
            $("#btWrap").show();
        }

        var startKickOff = function(ballPosX, ballPosY, plMove) {

            animePlayer();
            var comMove = computerMove(plMove);
            checkMoves(plMove,comMove);
            keeperInstruct(comMove);
            MoveBall(ballPosX, ballPosY);
            keeperFall();

            setTimeout(function() {
                MoveBall(150, 345);
                keeperMove(0,310,125);
                nextPlayer();
            },3000);

            setTimeout(function() {
                $("#goalDiv").hide();
                $("#missedDiv").hide();
            },4000);

            checkGameStatus();
            $("#goalDiv").hide();

        };


        var checkGameStatus = function() {
            var counter = parseInt($('#counterDiv').text()) + 1;
            var p1 = parseInt($('#p1ResultDiv').text());
            var p2 = parseInt($('#p2ResultDiv').text());
            if (counter==numbGames && p1==p2) {
                numbGames=numbGames+2;
            }
            if (counter < numbGames) {
                $('#counterDiv').text(counter);
            } else {
                $('#counterDiv').text("GAME OVER");
                $("#btWrap").hide();
                $("#btRest").show();
                $('#plMove').text("");
                if (p1 > p2) {
                    $("#plMove").text("Player 1 Wins");
                } else {
                    $("#plMove").text("Player 2 Wins");
                }
            }

        }

        var computerMove = function(plMove) {
            if (plMove>=1 && plMove<=3) {
                return (Math.floor(Math.random()*(3-1+1))+1);
            }
            else if (plMove>=4 && plMove<=5) {
                return (Math.floor(Math.random()*(5-4+1))+4);
            }
            else if (plMove>=6 && plMove<=8) {
                return (Math.floor(Math.random()*(8-6+1))+6);
            }
        }

        var ballInside = function(inOut) {

            if(inOut=="in") {
                setTimeout(function() {
                    $(".ball").css({"margin-top": "-40px","margin-right": "0px","margin-bottom": "0px","margin-left": "350px"});
                    goalSound("in");
                }, 900);
                setTimeout(function() {
                    $("#goalDiv").show();
                    goalSound();
                }, 2500);
            } else if (inOut=="out") {
                goalSound("out");
                setTimeout(function() {
                    $(".ball").css({"margin-top": "30px","margin-right": "0px","margin-bottom": "0px","margin-left": "240px"});
                }, 900);
                setTimeout(function() {
                    $("#missedDiv").show();
                }, 2500);
            }
        }

        var MoveBall = function(top, left) {
            $(".ball").css({"margin-top": top,"margin-right": "0px","margin-bottom": "0px","margin-left": left});
        }

        var keeperInstruct = function(move) {

            switch(move) {
                case 1: //keeperMoveLeftBottom
                    keeperMove("-90","205","140");
                    break;
                case 2: //keeperMoveLeftCentre
                    keeperMove("-90","205","120");
                    break;
                case 3: //keeperMoveLeftTop
                    keeperMove("-90","205","90");
                    break;
                case 4: // keeperMoveCenter
                    keeperMove("0","310","135");
                    break;
                case 5: // keeperMoveCenterTop
                    keeperMove("0","310","105");
                    break;
                case 6: // keeperMoveRigthBottom
                    keeperMove("90","410","140");
                    break;
                case 7: //keeperMoveRigthCentre
                    keeperMove("90","410","120");
                    break;
                case 8: //keeperMoveRigthTop
                    keeperMove("90","410","90");
                    break;
                default:
                    console.log(move);
            }
        }

        var keeperMove = function(rotate,margLeft,margTop) {
            $("#keeper").css({
                "transform": "rotate("+rotate+"deg)",
                "margin-left": +margLeft+"px",
                "margin-top": +margTop+"px"
            });
        }

        var keeperFall = function() {
            setTimeout(function() {
                $("#keeper").css({
                    "transition": "1s ease-in-out",
                    "margin-top": "140px",
                });
            }, 800);

            setTimeout(function() {
                $("#keeper").css({
                    "transition": "1s ease-in-out",
                    "transform": "rotate(0deg)"
                });
            }, 1000);
        }


        var checkMoves = function(playerMove, computerMove) {
            if (playerMove==computerMove) {

                ballInside("out");
                writeHtml("missed", "missed");
            } else {
                ballInside("in");

                if ($("#plMove").text() == "Player 1 Turn") {
                    writeHtml("p1", "Goal");
                } else if ($("#plMove").text() == "Player 2 Turn"){
                    writeHtml("p2", "Goal");
                }
            }
        }

        var writeHtml = function(winner, goal) {

            $('#plScored').text(goal);

            var p1 = parseInt($('#p1ResultDiv').text()) + 1;
            var p2 = parseInt($('#p2ResultDiv').text()) + 1;

            if (winner=="p1") {
                $('#p1ResultDiv').text(p1);
            }
            else if (winner=="p2") {
                $('#p2ResultDiv').text(p2);
            };
        }

        var animePlayer = function() {
            $('#plImg1').fadeOut("80");
            $('#plImg2').fadeIn("90");
            $('#plImg2').fadeOut("350");
            $('#plImg3').fadeIn("300");
            $('#plImg3').fadeOut("500");
            $('#plImg1').fadeIn("90");
        }

        var nextPlayer = function() {
            if ($("#plMove").text() == "Player 1 Turn") {
                $("#plMove").text("Player 2 Turn");
                chgPlImg();
            } else if ($("#plMove").text() == "Player 2 Turn"){
                $("#plMove").text("Player 1 Turn");
                chgPlImg();
            }
        }

        var chgPlImg = function() {
            if ($("#plMove").text() == "Player 1 Turn") {
                $("#plImg1").attr("src","images/player1.png");
                $("#plImg2").attr("src","images/player2.png");
                $("#plImg3").attr("src","images/player3.png");
            } else {
                $("#plImg1").attr("src","images/player4.png");
                $("#plImg2").attr("src","images/player5.png");
                $("#plImg3").attr("src","images/player6.png");
            }
        }
        // $("#field").click(function(e) {
        //     var offset = $(this).offset();
        //     console.log("X" + (e.pageX - offset.left));
        //     console.log("Y" + (e.pageY - offset.top));
        //   })

        goalSound();
        restartGame();






        //load assetts
       var assetLoader = (function () {
            // images dictionary
            this.imgs = {
                'bg': 'images/game-bg.png',
                'field': 'images/field2',
                'arrow': 'images/arrow.png',
                'goalpost': 'images/goalpost.png',
                'button': 'images/extraButton.png',
                'goalkeeper': 'images/goalkeeper.png',
                'keeper-dive': 'images/keeper-dive.png',
                'missed': 'images/missed.png',
                'player1': 'images/player1.png',
                'player2': 'images/player2.png',
                'player3': 'images/player3.png',
                'player4': 'images/player4.png',
                'player5': 'images/player5.png',
                'player6': 'images/player6.png',
                'player7': 'images/player7.png',
                'player8': 'images/player8.png',
                'player9': 'images/player9.png'
            };

            // sounds dictionary
            this.sounds = {
                'in': 'sounds/goal2.mp3',
                'out': 'sounds/missed.mp3',
                'audioCrowd': 'sounds/crowd2.mp3'
            };

            var assetsLoaded = 0;                                // how many assets have been loaded
            var numImgs = Object.keys(this.imgs).length;    // total number of image assets
            var numSounds = Object.keys(this.sounds).length;  // total number of sound assets
            this.totalAssest = numImgs;                          // total number of assets

            /**
             * Ensure all assets are loaded before using them
             * @param {number} dic  - Dictionary name ('imgs', 'sounds', 'fonts')
             * @param {number} name - Asset name in the dictionary
             */
            function assetLoaded(dic, name) {
                // don't count assets that have already loaded
                if (this[dic][name].status !== 'loading') {
                    return;
                }

                this[dic][name].status = 'loaded';
                assetsLoaded++;

                // progress callback
                if (typeof this.progress === 'function') {
                    this.progress(assetsLoaded, this.totalAssest);
                }

                // finished callback
                if (assetsLoaded === this.totalAssest && typeof this.finished === 'function') {
                    this.finished();
                }
            }

            /**
             * Check the ready state of an Audio file.
             * @param {object} sound - Name of the audio asset that was loaded.
             */
            function _checkAudioState(sound) {
                if (this.sounds[sound].status === 'loading' && this.sounds[sound].readyState === 4) {
                    assetLoaded.call(this, 'sounds', sound);
                }
            }

            /**
             * Create assets, set callback for asset loading, set asset source
             */
            this.downloadAll = function () {
                var _this = this;
                var src;

                // load images
                for (var img in this.imgs) {
                    if (this.imgs.hasOwnProperty(img)) {
                        src = this.imgs[img];

                        // create a closure for event binding
                        (function (_this, img) {
                            _this.imgs[img] = new Image();
                            _this.imgs[img].status = 'loading';
                            _this.imgs[img].name = img;
                            _this.imgs[img].onload = function () {
                                assetLoaded.call(_this, 'imgs', img)
                            };
                            _this.imgs[img].src = src;
                        })(_this, img);
                    }
                }

                // load sounds
                for (var sound in this.sounds) {
                    if (this.sounds.hasOwnProperty(sound)) {
                        src = this.sounds[sound];

                        // create a closure for event binding
                        (function (_this, sound) {
                            _this.sounds[sound] = new Audio();
                            _this.sounds[sound].status = 'loading';
                            _this.sounds[sound].name = sound;
                            _this.sounds[sound].addEventListener('canplay', function () {
                                _checkAudioState.call(_this, sound);
                            });
                            _this.sounds[sound].src = src;
                            _this.sounds[sound].preload = 'auto';
                            _this.sounds[sound].load();
                        })(_this, sound);
                    }
                }
            }

            return {
                imgs: this.imgs,
                sounds: this.sounds,
                totalAssest: this.totalAssest,
                downloadAll: this.downloadAll
            };
        })();

        /**
         * Show asset loading progress
         * @param {integer} progress - Number of assets loaded
         * @param {integer} total - Total number of assets
         */
        assetLoader.progress = function (progress, total) {
            var pBar = document.getElementById('progress-bar');
            pBar.value = progress / total;
            document.getElementById('p').innerHTML = Math.round(pBar.value * 100) + "%";
        }

        /**
         * Load the main menu
         */
        assetLoader.finished = function () {
            mainMenu();
        }



        function mainMenu() {
            for (var sound in assetLoader.sounds) {
                if (assetLoader.sounds.hasOwnProperty(sound)) {
                    assetLoader.sounds[sound].muted = !playSound;
                }
            }

            $('#progress').hide();
            $('#main').show();
            $('#menu').addClass('main');
            $('.sound').show();
        }

        



        /**
         * Click handlers for the different menu screens
         */
        $('.credits').click(function () {
            $('#main').hide();
            $('#instructions').hide();
            $('#credits').show();
            $('#menu').addClass('credits');
        });
        $('.instructions').click(function () {
            $('#main').hide();
            $('#credits').hide();
            $('#instructions').show();
            $('#menu').addClass('instructions');
        });
        $('.back').click(function () {
            $('#credits').hide();
            $('#instructions').hide();
            $('#main').show();
            $('#menu').removeClass('credits');
        });
        $('.sound').click(function () {
            var $this = $(this);
            // sound off
            if ($this.hasClass('sound-on')) {
                $this.removeClass('sound-on').addClass('sound-off');
                playSound = false;
            }
            // sound on
            else {
                $this.removeClass('sound-off').addClass('sound-on');
                playSound = true;
            }

            if (canUseLocalStorage) {
                localStorage.setItem('kandi.playSound', playSound);
            }

            // mute or unmute all sounds
            for (var sound in assetLoader.sounds) {
                if (assetLoader.sounds.hasOwnProperty(sound)) {
                    assetLoader.sounds[sound].muted = !playSound;
                }
            }
        });
        $('.play').click(function () {
            $('#menu').hide();
            startKickOff();
        });
        $('.restart').click(function () {
            $('#game-over').hide();
            startGame();
        });

        assetLoader.downloadAll();
        goalSound();
        restartGame();
    }})(jQuery);

