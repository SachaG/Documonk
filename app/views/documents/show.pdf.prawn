pdf.text " #{@document.title}", :size => 30, :style => :bold

pdf.move_down(30)

pdf.text " #{@document.content}", :size => 14
